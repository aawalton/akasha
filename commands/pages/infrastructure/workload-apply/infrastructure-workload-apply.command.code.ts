import { existsSync } from "node:fs"
import { join } from "node:path"
import { textAt, valueAt } from "@akasha/pages/page-value"
import {
  CLUSTER_SERVICE_SUFFIX,
  codeBeside,
  MANIFEST_SUFFIX,
  namedAmong,
  pagesUnder,
  type Workload,
  wantingIn,
  workloadIn,
} from "../../../../infrastructure/cluster/services/web-app-reading/web-app-reading.module.code.ts"
import {
  appliedOf,
  planFor,
  putUp,
  unfilledOf,
  upAlready,
  writeManifests,
} from "../../../../infrastructure/cluster/services/workload-deploying/workload-deploying.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../modules/calling/calling.module.code.ts"

const INPUT = 1
const DATA = 2
const OPERATIONAL = 3
const DRY_RUN = "--dry-run"
const MANIFEST = "manifest"
const NEEDS = ["resourceKind", "namespace", "resourceName", MANIFEST]

export interface Servable {
  readonly servicePath: string
  readonly manifestPath: string
  readonly synthPath: string
  readonly workload: Workload
}

export type Read = { readonly servable: Servable } | { readonly refused: string }

export function servableNamed(root: string, slug: string): Read {
  const services = pagesUnder(root, CLUSTER_SERVICE_SUFFIX)
  if (services === null) {
    return { refused: `git could not list the cluster service pages under ${root}` }
  }
  const named = namedAmong(services, slug, CLUSTER_SERVICE_SUFFIX)
  if (named.length === 0) {
    return {
      refused: `no cluster service page is named \`${slug}\`, and ${services.length} cluster services have one`,
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
  const manifests = pagesUnder(root, MANIFEST_SUFFIX)
  if (manifests === null) return { refused: `git could not list the manifest pages under ${root}` }
  const wanted = textAt(service, MANIFEST) as string
  const found = namedAmong(manifests, wanted, MANIFEST_SUFFIX)
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

export async function infrastructureWorkloadApply(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const strange = argv.find((one) => one.startsWith("-") && one !== DRY_RUN)
  if (strange !== undefined) {
    return refused(
      `\`${strange}\` is nothing \`akasha infrastructure workload-apply\` takes`,
      INPUT
    )
  }
  const named = argv.filter((one) => !one.startsWith("-"))
  if (named.length === 0) {
    return refused("name the cluster service to apply by the slug its page carries", INPUT)
  }
  if (named.length > 1) {
    return refused(
      `one call applies one cluster service, and ${named.length} were named, so which one is meant is unsettled: ${named.join(", ")}`,
      INPUT
    )
  }
  const slug = named[0] as string
  const read = servableNamed(given.root, slug)
  if ("refused" in read) return refused(read.refused, DATA)
  const { servicePath, manifestPath, synthPath, workload } = read.servable

  const report: string[] = [
    `cluster-service\t${slug}\t${servicePath}`,
    `manifest\t${manifestPath}`,
    `workload\t${workload.kind} ${workload.namespace}/${workload.name}`,
    `code\t${synthPath}`,
  ]

  const plan = await planFor(given.root, workload, synthPath)
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

  let differs = false
  for (const manifest of plan.manifests) {
    const applied = appliedOf(manifest)
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

  if (argv.includes(DRY_RUN)) {
    report.push("dry-run\tnothing was applied; run it again without `--dry-run` to carry it out")
    return { report, refusals: [], code: 0 }
  }

  for (const one of writeManifests(given.root, plan)) report.push(`wrote\t${one}`)
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
