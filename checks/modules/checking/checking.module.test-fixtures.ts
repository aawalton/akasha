import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import {
  identitiesTakenFrom,
  idFiled,
  listedFiled,
  noneOfTypeFiled,
  pathFiled,
  valueAlsoFiled,
  valueTakenFrom,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { type Shadow, shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"
import { rootOf } from "../../../commands/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { onDisk } from "../change-walking/change-walking.module.code.ts"
import type { Cost } from "../cost/check-cost.module.code.ts"
import type { Judged } from "../judging/judging.module.code.ts"
import { checksIn, type Gathered } from "./checking.module.code.ts"

export const CHECK = "code-check"

const PAGE_TYPE = "page-type"

const MODULE = "module"

export const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const MODULE_AT = "akasha/code-system/modules/module.page-type.ts"

const MODULE_ID = "01a04bc4-0000-7000-8000-0000000000ff"

export const HELD_PAGE_AT = "akasha/held/held.module.ts"

export const HELD_CODE_AT = "akasha/held/held.module.code.ts"

export const ONE_TS = "akasha/one.ts"

export const TWO_TS = "akasha/two.ts"

export const ONE_MD = "akasha/one.md"

export const GONE_TS = "akasha/gone.ts"

export const STAYS_TS = "akasha/stays.ts"

export const WHOLE_TREE_CHECKS_TAKE = 30_000

const WALKING_AT = new URL("../change-walking/change-walking.module.code.ts", import.meta.url)
  .pathname

export const ROOT = rootOf(WALKING_AT)

const HELD = "akasha/checks-system/checking/checking.module"

export const SAMPLED: readonly string[] = [
  `${HELD}.code.ts`,
  `${HELD}.ts`,
  "akasha/persona-system/personas/ali/ali.persona.portrait.md",
]

export const scratch = scratchWorld()

type PageType = {
  readonly slug: string
  readonly at: string
}

const CHECK_PAGE_TYPE: PageType = {
  slug: CHECK,
  at: "akasha/checks/code-checks/code-check.page-type.ts",
}

export type Named = {
  readonly slug: string
  readonly runsOn: readonly string[]
  readonly experimental?: boolean
  readonly raw?: string
  readonly body: string
  readonly audit?: string
  readonly checkCeiling?: number
  readonly auditCeiling?: number
}

function ceilingsOf(one: Named): string {
  const check =
    one.checkCeiling === undefined ? "" : `  check: { maxCpuSeconds: ${one.checkCeiling} },\n`
  const audit =
    one.auditCeiling === undefined ? "" : `  audit: { maxCpuSeconds: ${one.auditCeiling} },\n`
  return check + audit
}

export function rootWith(named: readonly Named[], filedUnder: PageType = CHECK_PAGE_TYPE): string {
  const root = scratch.rootFor("akasha-checking-")
  noneOfTypeFiled(root, filedUnder.slug)
  idFiled(root, CHECK_TYPE, [{ path: filedUnder.at, id: CHECK_TYPE }])
  let minted = 0
  for (const one of named) {
    const at = `akasha/checks-system/code-check/${one.slug}/${one.slug}.${filedUnder.slug}.ts`
    mkdirSync(join(root, at.slice(0, at.lastIndexOf("/"))), { recursive: true })
    writeFileSync(
      join(root, at),
      `export const ${exportedAs(one.slug)} = {\n` +
        `  slug: "${one.slug}",\n` +
        `  code: "ts",\n` +
        (one.raw ??
          `  runsOnChange: ${one.runsOn.includes("change")},\n` +
            `  runsOnWorktree: ${one.runsOn.includes("worktree")},\n` +
            `  runsOnDeploy: ${one.runsOn.includes("deploy")},\n` +
            `  runsOnAudit: ${one.runsOn.includes("audit")},\n`) +
        (one.experimental === undefined ? "" : `  experimental: ${one.experimental},\n`) +
        ceilingsOf(one) +
        `}\n`
    )
    writeFileSync(join(root, `${at.slice(0, -".ts".length)}.code.ts`), one.body)
    if (one.audit !== undefined) {
      writeFileSync(join(root, `${at.slice(0, -".ts".length)}.audit.code.ts`), one.audit)
    }
    minted = minted + 1
    const id = `01a04bc4-0000-7000-8000-00000000000${minted}`
    const held = [{ path: at, id }]
    listedFiled(root, filedUnder.slug, one.slug, held)
    valueAlsoFiled(root, filedUnder.slug, [
      { path: at, value: { id, pageTypeSlug: filedUnder.slug, slug: one.slug } },
    ])
    idFiled(root, id, held)
    pathFiled(root, at, held)
    pathFiled(root, `${at.slice(0, -".ts".length)}.code.ts`, held)
  }
  return root
}

export function rootHolding(named: readonly Named[], holding: readonly string[]): string {
  const root = rootWith(named)
  for (const path of holding) writeFileSync(join(root, path), "held")
  return root
}

export const REFUSES_ALL =
  "export function refusesAll(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "refused" }))\n' +
  "}\n"

export const ADMITS_ALL = `export function admitsAll() {\n  return []\n}\n`

export const AUDITS = "audits-root"

export const AUDITS_ROOT =
  "export function auditsRoot(root) {\n" + '  return [{ path: "held", reason: root }]\n' + "}\n"

export const THROWS = `export function throws() {\n  throw new Error("could not look")\n}\n`

export const THROWS_UNDER =
  "function reaching() {\n" +
  '  throw new Error("the world at /var/tmp/held could not be made")\n' +
  "}\n" +
  "function worldMade() {\n" +
  "  reaching()\n" +
  "}\n" +
  "export function throwsUnder() {\n" +
  "  worldMade()\n" +
  "}\n"

export const NAMES_SHADOW =
  "export function namesShadow(change, shadow) {\n" +
  '  const held = shadow !== undefined && typeof shadow.pageOf === "function"\n' +
  "  return held && shadow.index !== undefined\n" +
  "    ? []\n" +
  '    : [{ path: "shadow", reason: "no shadow was handed over" }]\n' +
  "}\n"

export const REFUSES_TAKING =
  "export function refusesTaking(change) {\n" +
  "  return change.changed\n" +
  "    .filter((path) => change.after(path) === null)\n" +
  '    .map((path) => ({ path, reason: "`" + path + "` may not be taken away" }))\n' +
  "}\n"

const INPUT_TS =
  "export function inputTs(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "ts woke" }))\n' +
  "}\n" +
  'inputTs.isInput = (path) => path.endsWith(".ts")\n'

const INPUT_PAGES =
  `import { PAGES } from "${WALKING_AT}"\n` +
  "export function inputPages(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "a page woke" }))\n' +
  "}\n" +
  "inputPages.isInput = PAGES.isInput\n"

const INPUT_THROWS =
  "export function inputThrows(change) {\n" +
  '  return change.changed.map((path) => ({ path, reason: "woke anyway" }))\n' +
  "}\n" +
  "inputThrows.isInput = () => {\n" +
  '  throw new Error("the input could not be answered")\n' +
  "}\n"

export const TWO_CHECKS = [
  { slug: "input-ts", runsOn: ["change"], body: INPUT_TS },
  { slug: "refuses-all", runsOn: ["change"], body: REFUSES_ALL },
]

export const ADMITS = "admits-all"

export const REFUSES = "refuses-all"

export const BOTH_CHECKS = [
  { slug: ADMITS, runsOn: ["change"], body: ADMITS_ALL },
  { slug: REFUSES, runsOn: ["change"], body: REFUSES_ALL },
]

export const ADMITS_CHECK = [{ slug: ADMITS, runsOn: ["change"], body: ADMITS_ALL }]

export const SLEEPING_CHECK = [{ slug: ADMITS, runsOn: [], body: ADMITS_ALL }]

export const NO_PHASE_CHECK = [{ slug: ADMITS, runsOn: [], raw: "", body: ADMITS_ALL }]

export const UNLOADABLE_CHECK = [
  { slug: ADMITS, runsOn: ["change"], body: "export function admitsAll( {\n" },
]

export const REFUSES_CHECK = [{ slug: REFUSES, runsOn: ["change"], body: REFUSES_ALL }]

export const PHASE_CHECKS = [
  { slug: ADMITS, runsOn: ["change"], body: ADMITS_ALL },
  { slug: REFUSES, runsOn: ["deploy"], body: REFUSES_ALL },
]

export const EXPERIMENTAL_CHECKS = [
  { slug: ADMITS, runsOn: ["change", "audit"], experimental: true, body: ADMITS_ALL },
  { slug: REFUSES, runsOn: ["change"], body: REFUSES_ALL },
]

export const THROWS_CHECK = [{ slug: "throws", runsOn: ["change"], body: THROWS }]

export const THROWS_UNDER_CHECK = [{ slug: "throws-under", runsOn: ["change"], body: THROWS_UNDER }]

export const TAKING_CHECK = [{ slug: "refuses-taking", runsOn: ["change"], body: REFUSES_TAKING }]

export const SHADOW_CHECK = [{ slug: "names-shadow", runsOn: ["change"], body: NAMES_SHADOW }]

export const AUDITS_CHECK = [
  { slug: AUDITS, runsOn: ["audit"], body: ADMITS_ALL, audit: AUDITS_ROOT },
]

export const AUDITS_REFUSING = [
  { slug: AUDITS, runsOn: ["audit"], body: REFUSES_ALL, audit: AUDITS_ROOT },
]

export const BURNS = "burns-cpu"

const A_TICK = 20_000

const BURNS_CPU =
  "export function burnsCpu() {\n" +
  "  const opened = process.cpuUsage()\n" +
  "  for (;;) {\n" +
  "    const spent = process.cpuUsage(opened)\n" +
  `    if (spent.user + spent.system > ${A_TICK}) return []\n` +
  "  }\n" +
  "}\n"

export const BURNS_CHECK = [{ slug: BURNS, runsOn: ["change"], body: BURNS_CPU, checkCeiling: 0 }]

export const BURNS_AT_AUDIT = [
  {
    slug: BURNS,
    runsOn: ["audit"],
    body: BURNS_CPU,
    audit: ADMITS_ALL,
    checkCeiling: 0,
    auditCeiling: 60,
  },
]

export const GATHERED: Gathered = {
  slug: BURNS,
  page: checkAt(BURNS),
  root: ROOT,
  runsOn: ["change"],
  isInput: null,
  run: () => [],
}

export function costing(own: number, child: number): Cost {
  return {
    runId: "one",
    ranAt: "",
    phase: "change",
    ran: BURNS,
    wallMs: 0,
    cpuSeconds: own,
    childCpuSeconds: child,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    readCalls: 0,
    writeCalls: 0,
    readBytes: 0,
    pathsChanged: 1,
    refusals: 0,
  }
}

export function checkAt(slug: string): string {
  return `akasha/checks-system/code-check/${slug}/${slug}.${CHECK}.ts`
}

export function checkCodeAt(slug: string): string {
  return `${checkAt(slug).slice(0, -".ts".length)}.code.ts`
}

export function taking(root: string, gone: readonly string[]): Change {
  const disk = onDisk(root)
  return {
    root,
    changed: [...gone],
    before: disk,
    after: (path) => (gone.includes(path) ? null : disk(path)),
  }
}

export function overIn(root: string, changed: readonly string[]): Change {
  const held = onDisk(root)
  return { root, changed, after: held, before: held }
}

export function over(changed: readonly string[]): Change {
  return overIn(ROOT, changed)
}

type Sleeping = {
  readonly change: Change
  readonly shadow: Shadow
}

function sleepingAt(held: Map<string, Sleeping>, asleep: readonly string[]): Sleeping {
  const key = asleep.join(" ")
  const done = held.get(key)
  if (done !== undefined) return done
  const change = over(asleep)
  const made = { change, shadow: shadowAsked(change) }
  held.set(key, made)
  return made
}

export type Asleep = readonly (readonly [string, readonly Judged[]])[]

export async function judgedAsleep(): Promise<Asleep> {
  const asked = shadowAsked(over(SAMPLED))
  const held = new Map<string, Sleeping>()
  const said: (readonly [string, readonly Judged[]])[] = []
  for (const one of checksIn(ROOT)) {
    const takes = one.isInput
    if (takes === null || one.runsOn.length === 0) continue
    const asleep = SAMPLED.filter((path) => !takes(path, asked))
    if (asleep.length === 0) continue
    const sleeping = sleepingAt(held, asleep)
    said.push([one.slug, await one.run(sleeping.change, sleeping.shadow)])
  }
  return said
}

export function checksTakenFrom(root: string, slug: string): undefined {
  identitiesTakenFrom(root, CHECK)
  valueTakenFrom(root, CHECK, slug)
}

export const INPUT_THROWS_CHECKS = [
  { slug: "input-throws", runsOn: ["change"], body: INPUT_THROWS },
  { slug: "input-ts", runsOn: ["change"], body: INPUT_TS },
]

const PAGE_CHECKS = [
  { slug: "input-pages", runsOn: ["change"], body: INPUT_PAGES },
  { slug: "refuses-all", runsOn: ["change"], body: REFUSES_ALL },
]

export function pagedRoot(): string {
  const root = rootWith(PAGE_CHECKS)
  listedFiled(root, PAGE_TYPE, MODULE, [{ path: MODULE_AT, id: MODULE_ID }])
  mkdirSync(join(root, HELD_PAGE_AT.slice(0, HELD_PAGE_AT.lastIndexOf("/"))), { recursive: true })
  writeFileSync(join(root, HELD_PAGE_AT), `export const held = { slug: "held" }\n`)
  writeFileSync(join(root, HELD_CODE_AT), `export const HELD = "held"\n`)
  return root
}
