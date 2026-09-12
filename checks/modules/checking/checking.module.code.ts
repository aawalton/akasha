import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import type { Input } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import {
  type Cost,
  closing,
  costOf,
  opening,
  recordCost,
} from "akasha/checks/modules/cost/check-cost.module.code.ts"
import type {
  AnyAuditing,
  AnyRunning,
  Judged,
  Judging,
} from "akasha/checks/modules/judging/judging.module.code.ts"
import { modelChecksIn } from "akasha/checks/modules/model-running/model-running.module.code.ts"
import {
  diesIn,
  sparingOver,
} from "akasha/checks/modules/mortal-sparing/mortal-sparing.module.code.ts"
import { refusalText } from "akasha/checks/modules/refusal-text/refusal-text.module.code.ts"
import { framesOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyOfType, typeSlugOf } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { type Shadow, shadowAsked } from "akasha/pages/shadow/shadow.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export type Phase = "change" | "worktree" | "deploy" | "audit"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly root: string
  readonly code?: string | null
  readonly runsOn: readonly Phase[]
  readonly isInput: Input | null
  readonly run: AnyRunning
  readonly audit?: AnyAuditing | null
  readonly checkCeiling?: number | null
  readonly auditCeiling?: number | null
}

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const CODE = "code"

const CHECK_CODE = "check.code"

const AUDIT_CODE = "audit.code"

const TS = "ts"

const MAX_CPU = "maxCpuSeconds"

const CHECK_GROUP = "check"

const AUDIT_GROUP = "audit"

const OVER_CEILING = "check-over-its-ceiling"

const LOGS = "logs"

const FRAMES_AT_MOST = 3

const TAKES_EVERY_CHECK =
  "this change takes away every check that would judge it, so a clean answer would mean nothing"

const NOT_GATHERED = "could not be gathered, so it judged nothing"

const NONE_TAKES =
  "no check takes this change as input, so nothing judged it and a clean answer would mean nothing"

const EVERY_PHASE: readonly Phase[] = ["change", "worktree", "deploy", "audit"]

const AT_CHANGE: Phase = "change"

const loadFrom = createRequire(import.meta.url)

export function checkSlugIn(root: string): string {
  return typeSlugOf(root, CHECK_TYPE)
}

export function checkPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfType(root, checkSlugIn(root)).map((one) => one.path))].sort()
}

const STATED: readonly (readonly [Phase, string])[] = [
  ["change", "runsOnChange"],
  ["worktree", "runsOnWorktree"],
  ["deploy", "runsOnDeploy"],
  ["audit", "runsOnAudit"],
]

const EXPERIMENTAL = "experimental"

function runsOnIn(value: Record<string, unknown>): readonly Phase[] | null {
  const held: Phase[] = []
  for (const [phase, named] of STATED) {
    const said = value[named]
    if (typeof said !== "boolean") return null
    if (said) held.push(phase)
  }
  return value[EXPERIMENTAL] === true ? [] : held
}

function ceilingIn(stated: Record<string, unknown>, group: string): number | null {
  const said = stated[group]
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = (said as Record<string, unknown>)[MAX_CPU]
  return typeof held === "number" ? held : null
}

function logsUnder(one: Gathered, group: string): string | undefined {
  const code = one.code ?? null
  return code === null ? undefined : `${group}.${LOGS}`
}

export function ranOver(one: Gathered, group: string, cost: Cost): Judged | null {
  const ceiling = group === AUDIT_GROUP ? one.auditCeiling : one.checkCeiling
  if (ceiling === undefined || ceiling === null) return null
  const spent = Number((cost.cpuSeconds + cost.childCpuSeconds).toFixed(3))
  if (spent <= ceiling) return null
  return {
    path: one.page,
    reason: refusalText(OVER_CEILING, {
      slug: one.slug,
      spent: String(spent),
      ceiling: String(ceiling),
    }),
  }
}

function inputIn(run: AnyRunning): Input | null {
  const said = (run as { readonly isInput?: unknown }).isInput
  return typeof said === "function" ? (said as Input) : null
}

type Held<T> = { readonly held: T } | { readonly why: string }

function statedIn(at: string, slug: string, page: string): Held<Record<string, unknown>> {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    return { why: `${page} is a check page, and would not load — ${saidBy(thrown)}` }
  }
  const named = mod[exportedAs(slug)]
  if (named === null || typeof named !== "object") {
    return {
      why: `${page} is a check page, and answers to no \`${exportedAs(slug)}\` a runner can read`,
    }
  }
  return { held: named as Record<string, unknown> }
}

function runningIn<T>(at: string, slug: string, beside: string, page: string): Held<T> {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    return { why: `${beside} is a check's code, and would not load — ${saidBy(thrown)}` }
  }
  const named = mod[exportedAs(slug)]
  if (typeof named === "function") return { held: named as T }
  const every = Object.values(mod).filter((one) => typeof one === "function")
  if (every.length === 1 && every[0] !== undefined) return { held: every[0] as T }
  return { why: `${page} is a check page, and ${beside} answers to nothing that can be run` }
}

export function codeOf(root: string, page: string): string | null {
  const held = besideAt(page, CHECK_CODE, TS)
  if (held !== null && existsSync(join(root, held))) return held
  const found = besideAt(page, CODE, TS)
  return found !== null && existsSync(join(root, found)) ? found : null
}

export function auditCodeOf(root: string, page: string): string | null {
  const held = besideAt(page, AUDIT_CODE, TS)
  return held !== null && existsSync(join(root, held)) ? held : null
}

function auditingIfThere(root: string, page: string, slug: string): Held<AnyAuditing | null> {
  const beside = auditCodeOf(root, page)
  if (beside === null) return { held: null }
  return runningIn<AnyAuditing>(join(root, beside), slug, beside, page)
}

function refusing(
  root: string,
  page: string,
  slug: string,
  code: string | null,
  why: string
): Gathered {
  const said: readonly Judged[] = [
    { path: page, reason: `the check \`${slug}\` ${NOT_GATHERED} — ${why}`, threw: true },
  ]
  const run = (): readonly Judged[] => said
  return { slug, page, root, code, runsOn: EVERY_PHASE, isInput: null, run, audit: null }
}

function gatheredFrom(root: string, path: string, slug: string): Gathered | null {
  const broken = (why: string, code: string | null = null): Gathered =>
    refusing(root, path, slug, code, why)
  const stated = statedIn(join(root, path), slug, path)
  if ("why" in stated) return broken(stated.why)
  const runsOn = runsOnIn(stated.held)
  if (runsOn === null) {
    return broken(`${path} is a check page, and states no phase a runner can honour`)
  }
  const beside = codeOf(root, path)
  if (beside === null) {
    if (runsOn.length === 0) return null
    return broken(`${path} is a check page stating a phase, and no code sits beside that page`)
  }
  const run = runningIn<AnyRunning>(join(root, beside), slug, beside, path)
  if ("why" in run) return broken(run.why, beside)
  const audit = auditingIfThere(root, path, slug)
  if ("why" in audit) return broken(audit.why, beside)
  return {
    slug,
    page: path,
    root,
    code: beside,
    runsOn,
    isInput: inputIn(run.held),
    run: run.held,
    audit: audit.held,
    checkCeiling: ceilingIn(stated.held, CHECK_GROUP),
    auditCeiling: ceilingIn(stated.held, AUDIT_GROUP),
  }
}

export function checksIn(root: string): readonly Gathered[] {
  const found: Gathered[] = []
  for (const path of checkPagesIn(root)) {
    const said = partedIn(path)
    if (said === null) {
      throw new Error(`${path} is a check page, and its name says no slug a runner can read`)
    }
    const one = gatheredFrom(root, path, said.slug)
    if (one !== null) found.push(one)
  }
  for (const one of modelChecksIn(root)) {
    const runsOn: Phase[] = []
    if (one.onChange > 0) runsOn.push("change")
    if (one.onAudit > 0) runsOn.push("audit")
    found.push({
      slug: one.slug,
      page: one.page,
      root,
      runsOn,
      isInput: inputIn(one.run),
      run: one.run,
    })
  }
  if (found.length === 0) {
    throw new Error(
      "the index names no check, so nothing would judge this change and a clean answer would mean nothing"
    )
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function checksAt(every: readonly Gathered[], phase: Phase): readonly Gathered[] {
  return every.filter((one) => one.runsOn.includes(phase))
}

export function takesAny(one: Gathered, paths: readonly string[], shadow: Shadow): boolean {
  const takes = one.isInput
  if (takes === null) return true
  try {
    return paths.some((path) => takes(path, shadow))
  } catch {
    return true
  }
}

function takenAway(one: Gathered, change: Change): boolean {
  for (const path of change.changed) {
    if (path !== one.page && path !== one.code) continue
    if (change.after(path) === null) return true
  }
  return false
}

export function checksLeftBy(every: readonly Gathered[], change: Change): readonly Gathered[] {
  return every.filter((one) => !takenAway(one, change))
}

export function checksFor(
  every: readonly Gathered[],
  change: Change,
  shadow: Shadow
): readonly Gathered[] {
  return checksLeftBy(every, change).filter((one) => takesAny(one, change.changed, shadow))
}

function fileIn(frame: string): string {
  return frame.slice(0, frame.lastIndexOf(":", frame.lastIndexOf(":") - 1))
}

function beneath(thrown: unknown): readonly string[] {
  const runner = fileIn(framesOf(new Error(), 1)[0] ?? "")
  const said: string[] = []
  let last = ""
  for (const one of framesOf(thrown, FRAMES_AT_MOST)) {
    const file = fileIn(one)
    if (file === runner) break
    said.push(file === last ? one.slice(file.length + 1) : one)
    last = file
  }
  return said
}

function threw(one: Gathered, thrown: unknown): Judged {
  const frames = beneath(thrown)
  const at = frames[0] === undefined ? "" : ` at ${frames[0]}`
  const under = frames.length < 2 ? "" : ` (called from ${frames.slice(1).join(", ")})`
  return {
    path: one.page,
    reason: `the check \`${one.slug}\` threw${at}, so it judged nothing — ${saidBy(thrown)}${under}`,
    threw: true,
  }
}

type Ran = readonly Judged[] | Promise<readonly Judged[]>

function auditingOver(one: Gathered, wholly: string | null): (() => Ran) | null {
  if (wholly === null) return null
  const audit = one.audit ?? null
  if (audit === null) return null
  return () => audit(wholly)
}

export function judgingBy(
  every: readonly Gathered[],
  phase: Phase,
  wholly: string | null = null
): Judging {
  return {
    named: every.map((one) => one.slug),
    checksFor: (change) => checksFor(every, change, shadowAsked(change)).map((one) => one.slug),
    over: async (change, done = []) => {
      const left = checksLeftBy(every, change)
      const first = every[0]
      if (left.length === 0 && first !== undefined) {
        return [{ path: first.page, reason: TAKES_EVERY_CHECK }]
      }
      const shadow = shadowAsked(change)
      const running = checksFor(left, change, shadow)
      if (running.length === 0 && first !== undefined && wholly === null) {
        return [{ path: first.page, reason: NONE_TAKES }]
      }
      const dies = phase === AT_CHANGE ? diesIn(shadow.index.knownIn()) : null
      const sparing = dies === null ? null : sparingOver(change, dies)
      const runId = Bun.randomUUIDv7()
      const said: Judged[] = []
      for (const one of running) {
        const before = opening()
        const found: Judged[] = []
        const audit = auditingOver(one, wholly)
        const group = audit === null ? CHECK_GROUP : AUDIT_GROUP
        try {
          found.push(...(await (audit === null ? one.run(change, shadow) : audit())))
        } catch (thrown) {
          found.push(threw(one, thrown))
        }
        const cost = costOf(
          before,
          closing(),
          runId,
          phase,
          one.slug,
          change.changed.length,
          found.length
        )
        recordCost(one.root, one.page, cost, logsUnder(one, group))
        const over = ranOver(one, group, cost)
        const kept = sparing === null ? found : [...(await sparing(one.run, found))]
        if (over !== null) kept.push(over)
        said.push(...kept)
        done.push(one.slug)
      }
      return said
    },
  }
}

export function auditingIn(root: string): Judging {
  return judgingBy(checksAt(checksIn(root), "audit"), "audit", root)
}
