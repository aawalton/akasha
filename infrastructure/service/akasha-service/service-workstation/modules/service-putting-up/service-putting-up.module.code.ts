import { existsSync, readFileSync } from "node:fs"
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
import { changedBetween } from "akasha/command/pages/deploy/modules/check-judging/deploy-check-judging.module.code.ts"
import {
  closuresOf,
  readingAt,
} from "akasha/command/pages/deploy/modules/file-closure/deploy-file-closure.module.code.ts"
import { WORKSTATION_SERVICE } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  commandOf,
  pathOf,
  type Refused,
  runOf,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/run-composing/run-composing.module.code.ts"
import {
  bundleAt,
  bundledFor,
  bundledTeller,
  checkedOut,
  launchedCommitIn,
  type Made,
  saidOfUnbuilt,
  saidOfUnchecked,
  startedFromBundle,
  TELLER_STEM,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import {
  homeAt,
  installing,
  ourInstalled,
  type Plan,
  planFor,
  systemctl,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-installing/service-installing.module.code.ts"
import { everyService } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import { provingFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-running/service-running.module.code.ts"
import { serviceTelling } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-telling/service-telling.module.ts"
import {
  TELLING_TEMPLATE,
  tellingUnitText,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const TELLER = `${module.slug}/${serviceTelling.slug}` as const

const THIS_UNIT = "%i"

const NO_HOME = "no home directory is stated, so no unit has anywhere to sit"

type Planned = {
  readonly report: readonly string[]
  readonly home: string
  readonly plan: Plan
}

export function sharedUnitsIn(
  pages: string | Reading,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): ReadonlyMap<string, string> | Refused {
  const bundle = bundles.get(TELLER_STEM)
  const said =
    bundle === undefined
      ? commandOf(pages, { code: TELLER, arguments: [THIS_UNIT] }, codeAt)
      : { command: `${startedFromBundle(bundle)} ${THIS_UNIT}` }
  if ("refused" in said) return said
  const pagePath = pathOf(pages, TELLER)
  if (typeof pagePath !== "string") return pagePath
  return new Map([[TELLING_TEMPLATE, tellingUnitText({ command: said.command, pagePath })]])
}

export function provingAt(
  root: string,
  commit: string,
  restarting: ReadonlySet<string>
): readonly string[] {
  return provingFor(pagesAt(root, commit), restarting)
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

function sameBytes(one: string, other: string): boolean {
  try {
    return readFileSync(one).equals(readFileSync(other))
  } catch {
    return false
  }
}

function runsAlready(home: string, slug: string, fresh: string | undefined): boolean {
  const commit = launchedCommitIn(home, slug)
  if (fresh === undefined || commit === null) return false
  return sameBytes(fresh, bundleAt(home, slug, commit))
}

export function changedAmong(
  restarting: ReadonlySet<string>,
  bundles: ReadonlyMap<string, string>,
  home: string
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const slug of restarting) {
    if (!runsAlready(home, slug, bundles.get(slug))) found.add(slug)
  }
  return found
}

export function restartedAmong(
  restarting: ReadonlySet<string>,
  again: ReadonlySet<string>,
  bundles: ReadonlyMap<string, string>,
  home: string
): ReadonlySet<string> {
  return changedAmong(new Set([...restarting, ...again]), bundles, home)
}

type Since = (was: string) => readonly string[] | null

type Bundling = {
  readonly again: ReadonlySet<string>
  readonly kept: ReadonlyMap<string, string>
}

function keptBundleOf(
  home: string,
  slug: string,
  closure: ReadonlySet<string>,
  since: Since
): string | null {
  const running = launchedCommitIn(home, slug)
  if (running === null) return null
  const at = bundleAt(home, slug, running)
  if (!existsSync(at)) return null
  const changed = since(running)
  if (changed === null || changed.some((one) => closure.has(one))) return null
  return at
}

export function bundlingAmong(
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  home: string,
  since: Since
): Bundling {
  const again = new Set<string>()
  const kept = new Map<string, string>()
  for (const [slug, closure] of closures) {
    const at = keptBundleOf(home, slug, closure, since)
    if (at === null) again.add(slug)
    else kept.set(slug, at)
  }
  return { again, kept }
}

export function restartingAt(
  touched: ReadonlySet<string>,
  commit: string,
  closures: ReadonlyMap<string, ReadonlySet<string>>,
  since: Since,
  home: string | null = homeAt()
): ReadonlySet<string> {
  const found = new Set(notPutUpAt(touched, commit, home))
  if (home === null) return found
  for (const slug of bundlingAmong(closures, home, since).again) found.add(slug)
  return found
}

type Bundled =
  | {
      readonly bundles: ReadonlyMap<string, string>
      readonly again: ReadonlySet<string>
      readonly said: readonly string[]
    }
  | Refused

function changedOrNull(root: string, was: string, commit: string): readonly string[] | null {
  try {
    return changedBetween(root, was, commit)
  } catch {
    return null
  }
}

export function sinceAt(root: string, commit: string): Since {
  const held = new Map<string, readonly string[] | null>()
  return (was) => {
    if (!held.has(was)) held.set(was, changedOrNull(root, was, commit))
    return held.get(was) ?? null
  }
}

function closuresAt(
  root: string,
  commit: string,
  teller: string
): ReadonlyMap<string, ReadonlySet<string>> {
  const tellers = readingAt(root, commit).over([teller])
  return new Map([[TELLER_STEM, tellers], ...closuresOf(root, WORKSTATION_SERVICE, commit)])
}

async function bundledAt(
  pages: Reading,
  slug: string,
  home: string,
  commit: string,
  tree: string,
  teller: string
): Promise<Made> {
  if (slug === TELLER_STEM) return await bundledTeller(tree, join(tree, teller), home, commit, tree)
  return await bundledFor(pages, slug, home, commit, tree)
}

async function bundlesBuilt(
  root: string,
  pages: Reading,
  home: string,
  commit: string,
  leftAlone: ReadonlySet<string> = new Set()
): Promise<Bundled> {
  const run = runOf(pages, TELLER)
  if ("refused" in run) return { refused: saidOfUnbuilt(TELLER_STEM, run.refused) }
  const sorted = bundlingAmong(closuresAt(root, commit, run.path), home, sinceAt(root, commit))
  const bundles = new Map<string, string>()
  const said: string[] = []
  for (const [slug, at] of sorted.kept) {
    if (leftAlone.has(slug)) continue
    bundles.set(slug, at)
    said.push(`kept\t${slug}\t${at}`)
  }
  const wanted = [...sorted.again].filter((slug) => !leftAlone.has(slug))
  const again = new Set(wanted)
  if (wanted.length === 0) return { bundles, again, said }
  const checked = checkedOut(root, commit)
  if ("refused" in checked) return { refused: saidOfUnchecked(commit, checked.refused) }
  for (const slug of wanted) {
    const made = await bundledAt(pages, slug, home, commit, checked.tree, run.path)
    if (!("built" in made)) {
      return { refused: saidOfUnbuilt(slug, "unnamed" in made ? made.unnamed : made.refused) }
    }
    bundles.set(slug, made.built.at)
    said.push(`bundled\t${slug}\t${made.built.at}`)
  }
  return { bundles, again, said }
}

export function plannedEvery(
  pages: string | Reading,
  restarting: ReadonlySet<string> = new Set(),
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map(),
  leftAlone: ReadonlySet<string> = new Set()
): Planned | Answer {
  const read = everyService(pages, codeAt, bundles)
  if ("refused" in read) return refusedBy([read.refused], DATA)

  const home = homeAt()
  if (home === null) return refusedBy([NO_HOME], OPERATIONAL)

  const shared = sharedUnitsIn(pages, codeAt, bundles)
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

  const pages = pagesAt(root, commit)
  const built = await bundlesBuilt(root, pages, home, commit, leftAlone)
  if ("refused" in built) return refusedBy([built.refused], OPERATIONAL)

  const changed = restartedAmong(restarting, built.again, built.bundles, home)
  const planned = plannedEvery(pages, changed, codeAt, built.bundles, leftAlone)
  if (!("plan" in planned)) return planned

  const done = installing(planned.home, planned.plan, systemctl, up)
  const said = [...built.said, ...planned.report, ...done.did.map((what) => `did\t${what}`)]
  if (done.refused.length > 0) return answeredWith(said, done.refused, OPERATIONAL)
  return told(said)
}
