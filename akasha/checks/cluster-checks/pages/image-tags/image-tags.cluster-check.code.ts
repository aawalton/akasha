#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { checkImage } from "../../../../../infra/cluster-checks/src/lib/image-tag-rule.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../../tools/lib/check-workflow/remediation-doc"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  DOCKERFILE_FILE_NODE_TYPE,
  DockerfileFileAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/dockerfile-file/types.ts"
import { K8S_RESOURCE_NODE_TYPE } from "../../../../../tools/lib/graph/producers/k8s/types.ts"
import { K8sResourceAttrsSchema } from "../../../../../tools/lib/graph/producers/k8s/types-schemas"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[image-tags]"

interface CliArgs {
  jsonOutput: boolean
  treeSha: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    return toolExit(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    return toolExit(`unknown argument: ${parsed.positionals[0]}`)
  }
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

interface ImageTagViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly image: string
  readonly reason: string
}

interface ImageLine {
  readonly value: string
  readonly line: number
}

interface ImageBearer {
  readonly label: string
  readonly path: string
  readonly imageLines: readonly ImageLine[]
}

function bearersOf(fullGraph: Graph): readonly ImageBearer[] {
  return [
    ...fullGraph.nodes(K8S_RESOURCE_NODE_TYPE).map((node): ImageBearer => {
      const attrs = K8sResourceAttrsSchema.parse(node.attrs)
      return {
        label: `${attrs.path} — ${attrs.kind} ${attrs.name}`,
        path: attrs.path,
        imageLines: attrs.imageLines,
      }
    }),
    ...fullGraph.nodes(DOCKERFILE_FILE_NODE_TYPE).map((node): ImageBearer => {
      const attrs = DockerfileFileAttrsSchema.parse(node.attrs)
      return { label: attrs.path, path: attrs.path, imageLines: attrs.imageLines }
    }),
  ]
}

async function main(): Promise<never> {
  const args = parseArgs()

  let fullGraph: Graph
  try {
    fullGraph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    return toolExit(`failed to build the image graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const root = codeRoot()
  const bearers = bearersOf(fullGraph)

  const { population, violations } = examinePopulation<ImageBearer, ImageTagViolation>({
    members: bearers,
    unit: "k8s docs and dockerfiles",
    membership: {
      kind: "enumerated",
      because:
        "`bearers` is read off the graph built at the tree sha above — a node per `k8s-resource` and per `dockerfile-file` — and a build that could not complete throws out of `buildFrom` into the `toolExit` beside it rather than handing over a partial node set, so fewer members is fewer image-bearing documents in a tree that read whole",
    },
    labelOf: (bearer) => bearer.label,
    siteOf: (bearer) => resolve(root, bearer.path),
    examine: (bearer) => {
      const found: ImageTagViolation[] = []
      for (const image of bearer.imageLines) {
        const reason = checkImage(image.value)
        if (reason !== null) {
          found.push({ file: bearer.path, line: image.line, image: image.value, reason })
        }
      }
      return found
    },
  })

  return exitOnResult({
    violations,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Floating image tag violations",
      successMessage: "All container images use pinned tags.",
      remediationDoc: remediationHint(
        "pin: a version tag or an @sha256 digest — and where the file named is a generated manifest, the synth.ts that emits it"
      ),
      groupBy: (v) => `${v.file}:${v.line}`,
      formatViolation: (v) => `image: ${v.image}\n      reason: ${v.reason}`,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
