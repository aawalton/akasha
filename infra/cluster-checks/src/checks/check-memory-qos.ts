#!/usr/bin/env bun

import { resolve } from "node:path"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import { CODE_REPO } from "../../../../repo/scope/scope.ts"
import { K8S_RESOURCE_NODE_TYPE } from "../../../../tools/lib/graph/producers/k8s/types.ts"
import { K8sResourceAttrsSchema } from "../../../../tools/lib/graph/producers/k8s/types-schemas"
import type { Graph } from "../../../../tools/lib/graph/types.ts"
import { codeRoot } from "../../../../tools/lib/code-root.ts"
import { parseArgs as parseCliArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[memory-qos]"

const FLAG_SPEC = { treeSha: { kind: "string", required: true } } as const

const LEAST_CONTAINER_PROBES = 5

const MEMBERSHIP_FROM =
  "the five vendored component manifests standing under `infra/k8s/src/*/k8s/` — " +
  "cert-manager, cloudnative-pg, its barman-cloud plugin, metallb and metrics-server — each " +
  "declaring at least one container, walked by `walkManifestFiles` over the code repo at the " +
  "tree sha and read by `discoverManifests`, which throws where a listed manifest cannot be " +
  "read rather than dropping it from the walk; what this count buys is the range that throw " +
  "cannot see, the walk itself coming back short — every other Kubernetes manifest here is " +
  "generated and `repoFiles` leaves a `generated` directory out, so bringing these five under " +
  "a generator too would empty the subject and report Guaranteed QoS over nothing"

interface Violation {
  file: string
  line: number
  container: string
  problem: string
}

const BURSTABLE_EXEMPTIONS: readonly (readonly [string, string])[] = [
  [
    "alanwalton/atlas-web/generated/atlas-deployment.generated.yaml",
    "init-code",
  ],
  [
    "alanwalton/atlas-web/generated/atlas-deployment.generated.yaml",
    "code-sync",
  ],
  ["alanwalton/web/generated/web-deployment.generated.yaml", "init-code"],
  ["alanwalton/web/generated/web-deployment.generated.yaml", "code-sync"],
  [
    "archive-of-worlds/web/generated/web-deployment.generated.yaml",
    "init-code",
  ],
  [
    "archive-of-worlds/web/generated/web-deployment.generated.yaml",
    "code-sync",
  ],
  ["audhdalan/web/generated/web-deployment.generated.yaml", "init-code"],
  ["audhdalan/web/generated/web-deployment.generated.yaml", "code-sync"],
  ["smilingjenny/web/generated/web-deployment.generated.yaml", "init-code"],
  ["smilingjenny/web/generated/web-deployment.generated.yaml", "code-sync"],
  ["temper/web/generated/web-deployment.generated.yaml", "init-code"],
  ["temper/web/generated/web-deployment.generated.yaml", "code-sync"],
  ["infra/seaweedfs/backup-bulk/generated/backup-bulk.generated.yaml", "rclone-sync"],
]

const exemptionKey = (path: string, container: string | null): string =>
  `${path}\0${container ?? ""}`

const BURSTABLE_ALLOWLIST: ReadonlySet<string> = new Set(
  BURSTABLE_EXEMPTIONS.map(([path, container]) => exemptionKey(path, container))
)

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function parseArgs(): { readonly treeSha: string } {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    return toolExit(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    return toolExit(`unknown argument: ${parsed.positionals[0]}`)
  }
  return { treeSha: parsed.flags.treeSha }
}

function probesIn(graph: Graph): readonly {
  nodeId: string
  path: string
  probe: ReturnType<typeof K8sResourceAttrsSchema.parse>["containerResources"][number]
}[] {
  return graph.nodes(K8S_RESOURCE_NODE_TYPE).flatMap((node) => {
    if (node.repo !== CODE_REPO) return []
    const attrs = K8sResourceAttrsSchema.parse(node.attrs)
    return attrs.containerResources.map((probe) => ({ nodeId: node.id, path: attrs.path, probe }))
  })
}

async function main(): Promise<never> {
  const { treeSha } = parseArgs()
  const root = codeRoot()

  let graph: Graph
  try {
    graph = await buildFrom(readAt(treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the manifest graph at ${treeSha}: ${errorMessage(err)}`)
  }

  const probes = probesIn(graph)

  const { population, violations } = examinePopulation<(typeof probes)[number], Violation>({
    members: probes,
    unit: "container probes",
    membership: {
      kind: "atLeast",
      members: LEAST_CONTAINER_PROBES,
      from: MEMBERSHIP_FROM,
    },
    labelOf: ({ nodeId, probe }) => `${nodeId}#${probe.listKey}/${probe.containerName ?? "?"}`,
    siteOf: ({ path }) => resolve(root, path),
    examine: ({ path, probe }) => {
      const { requestMemory, limitMemory, containerName, listKey } = probe
      const at = (line: number): Omit<Violation, "problem"> => ({
        file: path,
        line,
        container: `${listKey}/${containerName ?? "<unnamed>"}`,
      })

      if (requestMemory === null && limitMemory === null) {
        return [
          {
            ...at(probe.line),
            problem:
              "declares neither a memory request nor a memory limit — BestEffort, the first " +
              "class evicted under node pressure. Add `resources.requests.memory` and " +
              "`resources.limits.memory`, equal, at the footprint the container needs.",
          },
        ]
      }
      if (limitMemory === null && requestMemory !== null) {
        return [
          {
            ...at(requestMemory.line),
            problem:
              `declares a memory request of ${requestMemory.value} and no limit — Burstable, ` +
              `free to grow until the node is exhausted. Add ` +
              `\`resources.limits.memory: ${requestMemory.value}\`.`,
          },
        ]
      }
      if (requestMemory === null && limitMemory !== null) {
        return [
          {
            ...at(limitMemory.line),
            problem:
              `declares a memory limit of ${limitMemory.value} and no request. Kubernetes ` +
              `defaults the request up to the limit, so the reservation is real and nobody here ` +
              `chose it. Add \`resources.requests.memory: ${limitMemory.value}\`.`,
          },
        ]
      }
      if (requestMemory === null || limitMemory === null) return []
      if (requestMemory.value === limitMemory.value) return []
      if (BURSTABLE_ALLOWLIST.has(exemptionKey(path, containerName))) return []
      return [
        {
          ...at(requestMemory.line),
          problem:
            `declares memory request ${requestMemory.value} against limit ${limitMemory.value}. ` +
            `Raise both together to the footprint the container needs, or add this workload to ` +
            `BURSTABLE_ALLOWLIST in this file with the reason it bursts.`,
        },
      ]
    },
  })

  return exitOnResult({
    violations,
    options: {
      population,
      prefix: PREFIX,
      header: "Memory QoS violations",
      successMessage:
        "Every container declares a memory request equal to its memory limit (Guaranteed QoS).",
      groupBy: (v) => `${v.file}:${v.line}`,
      formatViolation: (v) => `container: ${v.container}\n      ${v.problem}`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
