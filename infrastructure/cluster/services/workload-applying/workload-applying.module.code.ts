import { existsSync } from "node:fs"
import { join } from "node:path"
import { publishedFor } from "akasha/infrastructure/container-image/image-publishing/image-publishing.module.code.ts"
import { slugsOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt, valueAt } from "akasha/pages/value/page-value.module.code.ts"
import {
  CLUSTER_SERVICE_TYPE,
  codeBeside,
  MANIFEST_TYPE,
  pathsNamed,
  type Workload,
  wantingIn,
  workloadIn,
} from "../web-app-reading/web-app-reading.module.code.ts"
import {
  appliedOf,
  planFor,
  putUp,
  unfilledOf,
  upAlready,
  writeManifests,
} from "../workload-deploying/workload-deploying.module.code.ts"

const DATA = 2
const OPERATIONAL = 3
const MANIFEST = "manifest"
const NEEDS = ["resourceKind", "namespace", "resourceName", MANIFEST]

export interface Servable {
  readonly servicePath: string
  readonly manifestPath: string
  readonly synthPath: string
  readonly workload: Workload
}

export type Read = { readonly servable: Servable } | { readonly refused: string }

export interface Applied {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

export function servableNamed(root: string, slug: string): Read {
  const named = pathsNamed(root, CLUSTER_SERVICE_TYPE, slug)
  if (named.length === 0) {
    const every = slugsOfType(root, CLUSTER_SERVICE_TYPE)
    return {
      refused: `no cluster service page is named \`${slug}\`, and ${every.length} cluster services have one`,
    }
  }
  if (named.length > 1) {
    return {
      refused: `${named.length} cluster service pages are named \`${slug}\`, so which workload is meant is unsettled: ${named.join(", ")}`,
    }
  }
  const servicePath = named[0] as string
  const service = valueAt(servicePath, root)
  if (service === null) {
    return { refused: `${servicePath} would not load, so the workload it states is not read` }
  }
  const short = wantingIn(service, NEEDS)
  if (short.length > 0) {
    return {
      refused: `${servicePath} states no ${short.join(" and no ")}, so the workload \`${slug}\` is applied as is not whole`,
    }
  }
  const workload = workloadIn(service)
  if (workload === null) {
    return {
      refused: `${servicePath} states no kind, namespace and resource name together, so it names no workload`,
    }
  }
  const wanted = textAt(service, MANIFEST) as string
  const found = pathsNamed(root, MANIFEST_TYPE, wanted)
  if (found.length === 0) {
    return {
      refused: `${servicePath} names the manifest \`${wanted}\`, which no page describes, so nothing says what the cluster is given`,
    }
  }
  if (found.length > 1) {
    return {
      refused: `${found.length} manifest pages are named \`${wanted}\`, so which resources are meant is unsettled: ${found.join(", ")}`,
    }
  }
  const manifestPath = found[0] as string
  const synthPath = codeBeside(manifestPath)
  if (!existsSync(join(root, synthPath))) {
    return {
      refused: `${manifestPath} carries its code at ${synthPath}, and no file is there, so nothing says what \`${slug}\` is made of`,
    }
  }
  return { servable: { servicePath, manifestPath, synthPath, workload } }
}

export async function appliedWorkload(
  root: string,
  slug: string,
  servable: Servable,
  dryRun: boolean
): Promise<Applied> {
  const { servicePath, manifestPath, synthPath, workload } = servable
  const report: string[] = [
    `cluster-service\t${slug}\t${servicePath}`,
    `manifest\t${manifestPath}`,
    `workload\t${workload.kind} ${workload.namespace}/${workload.name}`,
    `code\t${synthPath}`,
  ]

  const plan = await planFor(root, workload, synthPath)
  if (typeof plan === "string") return { report, refusals: [plan], code: DATA }

  const left = unfilledOf(plan)
  if (left.length > 0) {
    return {
      report,
      refusals: left.map(
        (one) => `${one}, and applying it would write the stand-in itself into the cluster`
      ),
      code: DATA,
    }
  }

  try {
    for (const one of await publishedFor(
      plan.manifests.map((manifest) => manifest.yaml),
      dryRun
    )) {
      const how = one.held ? "in the registry" : one.built ? "built and pushed" : "would be built"
      report.push(`image\t${one.ref}\t${how}`)
    }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { report, refusals: [why], code: OPERATIONAL }
  }

  let differs = false
  for (const manifest of plan.manifests) {
    const applied = appliedOf(plan, manifest)
    if ("why" in applied) return { report, refusals: [applied.why], code: OPERATIONAL }
    report.push(`manifest\t${manifest.path}\t${applied.stands ? "matches" : "differs"}`)
    if (!applied.stands) differs = true
  }
  const up = upAlready(workload)
  report.push(`running\t${up ? "yes" : "no"}`)

  if (!differs && up) {
    report.push(`nothing\tthe cluster already runs ${slug} as its page describes`)
    return { report, refusals: [], code: 0 }
  }

  if (dryRun) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  for (const one of writeManifests(root, plan)) report.push(`wrote\t${one}`)
  const refusals: string[] = []
  for (const one of putUp(plan)) {
    report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
    if (one.code !== 0) {
      refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
    }
  }
  if (refusals.length > 0) return { report, refusals, code: OPERATIONAL }

  report.push(
    `up\t${workload.kind} ${workload.namespace}/${workload.name} runs as its page describes`
  )
  return { report, refusals: [], code: 0 }
}
