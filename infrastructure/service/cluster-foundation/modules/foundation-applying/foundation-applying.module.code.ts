import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  codeBeside,
  MANIFEST_TYPE,
  pathsNamed,
} from "akasha/infrastructure/service/cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import { appliedSaid } from "akasha/infrastructure/service/cluster/modules/workload-applying/workload-applying.module.code.ts"
import {
  appliedOf,
  type Plan,
  planFor,
  putUp,
  unfilledOf,
  writeManifests,
} from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { slugsOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { slugsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const CLUSTER_FOUNDATION_TYPE = "cluster-foundation"

const MANIFEST = "manifest"

export interface Grounding {
  readonly slug: string
  readonly manifestPath: string
  readonly synthPath: string
}

export interface Foundation {
  readonly pagePath: string
  readonly grounding: readonly Grounding[]
}

export type Read = { readonly foundation: Foundation } | { readonly refused: string }

function groundingFor(root: string, pagePath: string, slug: string): Grounding | string {
  const found = pathsNamed(root, MANIFEST_TYPE, slug)
  if (found.length === 0) {
    return `${pagePath} names the manifest \`${slug}\`, which no page describes, so nothing says what the cluster is given`
  }
  if (found.length > 1) {
    return `${found.length} manifest pages are named \`${slug}\`, so which resources are meant is unsettled: ${found.join(", ")}`
  }
  const manifestPath = found[0] as string
  const synthPath = codeBeside(manifestPath)
  if (!existsSync(join(root, synthPath))) {
    return `${manifestPath} carries its code at ${synthPath}, and no file is there, so nothing says what \`${slug}\` is made of`
  }
  return { slug, manifestPath, synthPath }
}

export function foundationNamed(root: string, slug: string): Read {
  const named = pathsNamed(root, CLUSTER_FOUNDATION_TYPE, slug)
  if (named.length === 0) {
    const every = slugsOfType(root, CLUSTER_FOUNDATION_TYPE)
    return {
      refused: `no cluster foundation page is named \`${slug}\`, and ${every.length} cluster foundations have one: ${every.join(", ")}`,
    }
  }
  if (named.length > 1) {
    return {
      refused: `${named.length} cluster foundation pages are named \`${slug}\`, so which manifests are meant is unsettled: ${named.join(", ")}`,
    }
  }
  const pagePath = named[0] as string
  const page = valueAt(pagePath, root)
  if (page === null) {
    return { refused: `${pagePath} would not load, so the manifests it names are not read` }
  }
  const wanted = slugsIn(page[MANIFEST])
  if (wanted.length === 0) {
    return {
      refused: `${pagePath} names no manifest, so nothing says what the foundation \`${slug}\` is`,
    }
  }
  const grounding: Grounding[] = []
  for (const one of wanted) {
    const read = groundingFor(root, pagePath, one)
    if (typeof read === "string") return { refused: read }
    grounding.push(read)
  }
  return { foundation: { pagePath, grounding } }
}

type Planned = { readonly plans: readonly Plan[] } | { readonly why: readonly string[] }

async function plannedFor(
  codeAt: string,
  grounding: readonly Grounding[],
  report: string[]
): Promise<Planned> {
  const plans: Plan[] = []
  for (const one of grounding) {
    report.push(`manifest\t${one.slug}\t${one.manifestPath}`)
    report.push(`code\t${one.synthPath}`)
    const plan = await planFor(codeAt, null, one.synthPath)
    if (typeof plan === "string") return { why: [plan] }
    const left = unfilledOf(plan)
    if (left.length > 0) {
      return {
        why: left.map(
          (why) => `${why}, and applying it would write the stand-in itself into the cluster`
        ),
      }
    }
    plans.push(plan)
  }
  return { plans }
}

export async function appliedFoundation(
  root: string,
  slug: string,
  codeAt: string,
  up: string[] = []
): Promise<Answer> {
  const read = foundationNamed(root, slug)
  if ("refused" in read) return answeredWith([], [read.refused], DATA)
  const { pagePath, grounding } = read.foundation
  const report: string[] = [`cluster-foundation\t${slug}\t${pagePath}`]

  const planned = await plannedFor(codeAt, grounding, report)
  if ("why" in planned) return answeredWith(report, planned.why, DATA)

  let differs = false
  for (const plan of planned.plans) {
    for (const manifest of plan.manifests) {
      const applied = appliedOf(plan, manifest)
      if ("why" in applied) return answeredWith(report, [applied.why], OPERATIONAL)
      report.push(`manifest\t${manifest.path}\t${applied.stands ? "matches" : "differs"}`)
      if (!applied.stands) differs = true
    }
  }

  if (!differs) {
    report.push(`nothing\tthe cluster already holds ${slug} as its page describes`)
    return told(report)
  }

  const refusals: string[] = []
  for (const plan of planned.plans) {
    for (const one of writeManifests(root, plan)) report.push(`wrote\t${one}`)
    for (const one of putUp(plan)) {
      report.push(`kubectl\t${one.argv.join(" ")}\t${one.stdout.trim().split("\n").join("; ")}`)
      if (one.code !== 0) {
        refusals.push(`kubectl ${one.argv.join(" ")} exited ${one.code}: ${one.stderr.trim()}`)
        continue
      }
      up.push(appliedSaid(one.argv))
    }
  }
  if (refusals.length > 0) return answeredWith(report, refusals, OPERATIONAL)

  report.push(`up\t${slug} is in the cluster as its page describes`)
  return told(report)
}
