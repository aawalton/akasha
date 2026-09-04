import { createRequire } from "node:module"
import { join } from "node:path"
import { framesOf, saidBy } from "@akasha/command-system/fault-saying"
import { everyOfType, typeSlugOf } from "@akasha/indexes"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, partedIn } from "@akasha/pages-system/page-file-name"
import { type Shadow, shadowAsked } from "@akasha/pages-system/shadow"
import type { Input } from "../change-walking/change-walking.module.code.ts"
import { costOf, recordCost, taken } from "../check-cost/check-cost.module.code.ts"
import type { AnyRunning, Judged, Judging } from "../judging/judging.module.code.ts"
import { modelChecksIn } from "../model-running/model-running.module.code.ts"

export type Phase = "patch" | "worktree" | "deploy" | "audit"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOn: readonly Phase[]
  readonly isInput: Input | null
  readonly run: AnyRunning
}

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const CODE = "code"

const TS = "ts"

const FRAMES_AT_MOST = 3

const TAKES_EVERY_CHECK =
  "this change takes away every check that would judge it, so a clean answer would mean nothing"

const loadFrom = createRequire(import.meta.url)

export function checkSlugIn(root: string): string {
  return typeSlugOf(root, CHECK_TYPE)
}

export function checkPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfType(root, checkSlugIn(root)).map((one) => one.path))].sort()
}

const STATED: readonly (readonly [Phase, string])[] = [
  ["patch", "runsOnPatch"],
  ["worktree", "runsOnWorktree"],
  ["deploy", "runsOnDeploy"],
  ["audit", "runsOnAudit"],
]

function runsOnIn(value: Record<string, unknown>): readonly Phase[] | null {
  const held: Phase[] = []
  for (const [phase, named] of STATED) {
    const said = value[named]
    if (typeof said !== "boolean") return null
    if (said) held.push(phase)
  }
  return held
}

function inputIn(run: AnyRunning): Input | null {
  const said = (run as { readonly isInput?: unknown }).isInput
  return typeof said === "function" ? (said as Input) : null
}

function statedIn(at: string, slug: string, page: string): Record<string, unknown> | null {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    throw new Error(`${page} is a check page, and would not load — ${saidBy(thrown)}`)
  }
  const named = mod[exportedAs(slug)]
  if (named === null || typeof named !== "object") return null
  return named as Record<string, unknown>
}

function runningIn(at: string, slug: string, beside: string): AnyRunning | null {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    throw new Error(`${beside} is a check's code, and would not load — ${saidBy(thrown)}`)
  }
  const named = mod[exportedAs(slug)]
  if (typeof named === "function") return named as AnyRunning
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as AnyRunning) : null
}

export function checksIn(root: string): readonly Gathered[] {
  const found: Gathered[] = []
  for (const path of checkPagesIn(root)) {
    const said = partedIn(path)
    if (said === null) {
      throw new Error(`${path} is a check page, and its name says no slug a runner can read`)
    }
    const slug = said.slug
    const full = join(root, path)
    const stated = statedIn(full, slug, path)
    if (stated === null) {
      throw new Error(
        `${path} is a check page, and answers to no \`${exportedAs(slug)}\` a runner can read`
      )
    }
    const runsOn = runsOnIn(stated)
    if (runsOn === null) {
      throw new Error(`${path} is a check page, and states no phase a runner can honour`)
    }
    const beside = besideAt(path, CODE, TS)
    if (beside === null) {
      throw new Error(`${path} is a check page, and no code file can stand beside a name like it`)
    }
    const run = runningIn(join(root, beside), slug, beside)
    if (run === null) {
      throw new Error(`${path} is a check page, and ${beside} answers to nothing that can be run`)
    }
    found.push({ slug, page: path, runsOn, isInput: inputIn(run), run })
  }
  for (const one of modelChecksIn(root)) {
    const runsOn: Phase[] = []
    if (one.onPatch > 0) runsOn.push("patch")
    if (one.onAudit > 0) runsOn.push("audit")
    found.push({ slug: one.slug, page: one.page, runsOn, isInput: inputIn(one.run), run: one.run })
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

function takesFrom(one: Gathered, change: Change, shadow: Shadow): boolean {
  const takes = one.isInput
  if (takes === null) return true
  try {
    return change.changed.some((path) => takes(path, shadow))
  } catch {
    return true
  }
}

function takenAway(one: Gathered, change: Change): boolean {
  const code = besideAt(one.page, CODE, TS)
  for (const path of change.changed) {
    if (path !== one.page && path !== code) continue
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
  return checksLeftBy(every, change).filter((one) => takesFrom(one, change, shadow))
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

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    checksFor: (change) => checksFor(every, change, shadowAsked(change)).map((one) => one.slug),
    over: async (change) => {
      const left = checksLeftBy(every, change)
      const first = every[0]
      if (left.length === 0 && first !== undefined) {
        return [{ path: first.page, reason: TAKES_EVERY_CHECK }]
      }
      const shadow = shadowAsked(change)
      const said: Judged[] = []
      for (const one of checksFor(left, change, shadow)) {
        try {
          said.push(...(await one.run(change, shadow)))
        } catch (thrown) {
          said.push(threw(one, thrown))
        }
      }
      return said
    },
  }
}

export function auditingIn(root: string): Judging {
  return judgingBy(checksAt(checksIn(root), "audit"))
}
