import { join } from "node:path"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  answeredWith,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  commandOf,
  pathOf,
  type Refused,
  runOf,
} from "akasha/infrastructure/service/workstation/modules/run-composing/run-composing.module.code.ts"
import {
  bundledFor,
  bundledTeller,
  launchedCommitIn,
  launchedFromBundle,
  movedFrom,
  saidOfUnbuilt,
  saidOfUnmoved,
  startedFromBundle,
  TELLER_STEM,
} from "akasha/infrastructure/service/workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  type Plan,
  planFor,
  systemctl,
} from "akasha/infrastructure/service/workstation/modules/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/service/workstation/modules/service-reading/service-reading.module.code.ts"
import { serviceTelling } from "akasha/infrastructure/service/workstation/modules/service-telling/service-telling.module.ts"
import {
  TELLING_TEMPLATE,
  tellingUnitText,
} from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

const TELLER = `${module.slug}/${serviceTelling.slug}` as const

const THIS_UNIT = "%i"

const NO_HOME = "no home directory is stated, so no unit has anywhere to sit"

export type Planned = {
  readonly report: readonly string[]
  readonly home: string
  readonly plan: Plan
}

export function sharedUnitsIn(
  root: string,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): ReadonlyMap<string, string> | Refused {
  const bundle = bundles.get(TELLER_STEM)
  const said =
    bundle === undefined
      ? commandOf(root, { code: TELLER, arguments: [THIS_UNIT] }, codeAt)
      : { command: `${startedFromBundle(bundle)} ${THIS_UNIT}` }
  if ("refused" in said) return said
  const pagePath = pathOf(root, TELLER)
  if (typeof pagePath !== "string") return pagePath
  return new Map([[TELLING_TEMPLATE, tellingUnitText({ command: said.command, pagePath })]])
}

export function notPutUpAt(
  restarting: ReadonlySet<string>,
  commit: string,
  home: string | null = homeAt()
): ReadonlySet<string> {
  if (home === null) return restarting
  const found = new Set<string>()
  for (const slug of restarting) {
    if (launchedCommitIn(home, slug) !== commit) found.add(slug)
  }
  return found
}

export type Bundled =
  | { readonly bundles: ReadonlyMap<string, string>; readonly said: readonly string[] }
  | Refused

export async function bundlesBuilt(
  root: string,
  home: string,
  commit: string,
  leftAlone: ReadonlySet<string> = new Set()
): Promise<Bundled> {
  const bundles = new Map<string, string>()
  const said: string[] = []
  const moved = movedFrom(root, commit)
  if ("refused" in moved) return { refused: saidOfUnmoved(commit, moved.refused) }
  const run = runOf(root, TELLER)
  if ("refused" in run) return { refused: saidOfUnbuilt(TELLER_STEM, run.refused) }
  const teller = await bundledTeller(root, join(root, run.path), home, commit, moved.moved)
  if (!("built" in teller)) {
    const why = "unnamed" in teller ? teller.unnamed : teller.refused
    return { refused: saidOfUnbuilt(TELLER_STEM, why) }
  }
  bundles.set(TELLER_STEM, teller.built.at)
  said.push(`bundled\t${TELLER_STEM}\t${teller.built.at}`)
  for (const slug of launchedFromBundle(root)) {
    if (leftAlone.has(slug)) continue
    const made = await bundledFor(root, slug, home, commit, moved.moved)
    if (!("built" in made)) {
      return { refused: saidOfUnbuilt(slug, "unnamed" in made ? made.unnamed : made.refused) }
    }
    bundles.set(slug, made.built.at)
    said.push(`bundled\t${slug}\t${made.built.at}`)
  }
  return { bundles, said }
}

export function plannedEvery(
  root: string,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map(),
  leftAlone: ReadonlySet<string> = new Set()
): Planned | Answer {
  const read = everyService(root, codeAt, bundles)
  if ("refused" in read) return refusedBy([read.refused], DATA)

  const home = homeAt()
  if (home === null) return refusedBy([NO_HOME], OPERATIONAL)

  const shared = sharedUnitsIn(root, codeAt, bundles)
  if ("refused" in shared) return refusedBy([shared.refused], DATA)

  const plan = planFor(read.services, ourInstalled(home), restarting, shared, leftAlone)
  const report: string[] = [`service-workstation\t${read.services.length} service(s)`]
  for (const name of plan.write.keys()) report.push(`write\t${name}`)
  for (const name of plan.enable) report.push(`enable\t${name}`)
  for (const name of plan.restart ?? []) report.push(`restart\t${name}`)
  for (const name of plan.stop) report.push(`stop\t${name}`)
  for (const name of plan.remove) report.push(`remove\t${name}`)
  return { report, home, plan }
}

export async function putUpEvery(
  root: string,
  commit: string,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  up: string[] = [],
  leftAlone: ReadonlySet<string> = new Set()
): Promise<Answer> {
  const home = homeAt()
  if (home === null) return refusedBy([NO_HOME], OPERATIONAL)

  const built = await bundlesBuilt(root, home, commit, leftAlone)
  if ("refused" in built) return refusedBy([built.refused], OPERATIONAL)

  const planned = plannedEvery(root, restarting, codeAt, built.bundles, leftAlone)
  if (!("plan" in planned)) return planned

  const done = installing(planned.home, planned.plan, systemctl, up)
  const said = [...built.said, ...planned.report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return answeredWith(said, done.refused, OPERATIONAL)
  return told(said)
}
