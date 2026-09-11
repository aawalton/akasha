import { resolve } from "node:path"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Gathered } from "akasha/checks/modules/checking/checking.module.code.ts"
import {
  checksAt,
  checksIn,
  judgingBy,
} from "akasha/checks/modules/checking/checking.module.code.ts"
import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  pointerFor,
  refusalsPut,
} from "akasha/commands/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export const ANSWER_CEILING = 28000

export const REASON_CEILING = 240

const CHECK = "--check"

const FILE_PATH = "--file-path"

const AUDIT = "audit"

const NOTHING_RUNS =
  "no check runs at audit, so nothing would judge the folder and a clean answer would mean nothing"

const NOTHING_TAKES =
  "no check takes a file named as input, so nothing judged it and a clean answer would mean nothing"

export type Meant = {
  readonly only: readonly string[]
  readonly paths: readonly string[]
  readonly refusal: string | null
}

export type Narrowed = {
  readonly checks: readonly Gathered[]
  readonly refusals: readonly string[]
}

export type Over = {
  readonly change: Change
  readonly refusals: readonly string[]
}

export type Keeping = (whole: readonly string[]) => string | null

function heldFor(one: string, only: string[], paths: string[]): string[] | null {
  if (one === CHECK) return only
  if (one === FILE_PATH) return paths
  return null
}

export function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ only: [], paths: [], refusal: said })
  const only: string[] = []
  const paths: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    const held = heldFor(one, only, paths)
    if (held === null) {
      return refused(
        `\`${one}\` is not an argument this takes — \`${CHECK} <slug>\` narrows which checks ` +
          `run and \`${FILE_PATH} <path>\` narrows which files they see`
      )
    }
    const value = argv[at + 1]
    if (value === undefined) {
      return refused(
        `${one} names ${one === CHECK ? "a check" : "a path"}, and nothing followed it`
      )
    }
    if (held.includes(value)) return refused(`\`${value}\` is named more than once`)
    held.push(value)
    at += 1
  }
  return { only, paths, refusal: null }
}

export function narrowedTo(
  every: readonly Gathered[],
  atAudit: readonly Gathered[],
  named: readonly string[]
): Narrowed {
  if (named.length === 0) return { checks: atAudit, refusals: [] }
  const bySlug = new Map(every.map((one) => [one.slug, one]))
  const checks: Gathered[] = []
  const refusals: string[] = []
  for (const one of named) {
    const found = bySlug.get(one)
    if (found === undefined) {
      refusals.push(
        `\`${one}\` is no check the index names — those it names are ` +
          `\`${every.map((two) => two.slug).join("`, `")}\``
      )
      continue
    }
    checks.push(found)
  }
  return { checks, refusals }
}

export function underOf(named: readonly string[], one: string): readonly string[] {
  const held = one.endsWith("/") ? one.slice(0, -1) : one
  if (named.includes(held)) return [held]
  return named.filter((two) => two.startsWith(`${held}/`))
}

export function narrowedOver(change: Change, paths: readonly string[]): Over {
  if (paths.length === 0) return { change, refusals: [] }
  const refusals: string[] = []
  const held = new Set<string>()
  for (const one of paths) {
    const found = underOf(change.changed, one)
    if (found.length === 0) {
      refusals.push(`\`${one}\` is no file this repository holds, and no folder holding one`)
      continue
    }
    for (const two of found) held.add(two)
  }
  return { change: { ...change, changed: [...held].sort() }, refusals }
}

export function whollyFor(paths: readonly string[], root: string): string | null {
  return paths.length === 0 ? root : null
}

export function leftOutOf(atAudit: readonly Gathered[], ran: readonly Gathered[]): number {
  const slugs = new Set(ran.map((one) => one.slug))
  return atAudit.filter((one) => !slugs.has(one.slug)).length
}

export function notAnAuditIn(leftOut: number, judged: number, named: number): readonly string[] {
  const said: string[] = []
  if (leftOut > 0) said.push(`the ${counted(leftOut, "check")} it left out judged nothing`)
  if (judged < named) {
    said.push(`it judged ${counted(judged, "file")} rather than every file this repository holds`)
  }
  if (said.length === 0) return []
  return [`this is not an audit — ${said.join(", and ")}`]
}

export function notYetJudgingIn(
  every: readonly Gathered[],
  named: readonly string[]
): readonly string[] {
  if (named.length > 0) return []
  const held = every.filter((one) => one.runsOn.length === 0).length
  if (held === 0) return []
  return [`this answer leaves out ${counted(held, "check")} not yet judging`]
}

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length, "refusal")} in all, and the ${held.length} above are what one ` +
          `answer holds at ${ceiling} bytes — begin with those`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function reasonSaid(reason: string, ceiling: number): string {
  const said = reason
    .split("\n")
    .map((one) => one.replace(/\s+/g, " ").trim())
    .filter((one) => one !== "")
  const kept: string[] = []
  let held = 0
  for (const one of said) {
    if (kept.length > 0 && held + one.length + 1 > ceiling) break
    kept.push(one)
    held += one.length + 1
  }
  const whole = kept.join(" ")
  const over = whole.length - ceiling
  const more: string[] = []
  if (over > 0) more.push(counted(over, "character"))
  if (said.length > kept.length) more.push(counted(said.length - kept.length, "line"))
  const shown = over > 0 ? `${whole.slice(0, ceiling)}...` : whole
  return more.length === 0 ? shown : `${shown} (${more.join(" and ")} more)`
}

export async function judgedOver(
  judging: Judging,
  change: Change,
  also: readonly string[],
  keeping: Keeping | null = null
): Promise<Answer> {
  if (judging.named.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  let takenBy: readonly string[]
  let said: readonly Judged[]
  try {
    takenBy = judging.checksFor(change)
    said = await judging.over(change)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  if (takenBy.length === 0) return { report: [], refusals: [NOTHING_TAKES], code: 3 }
  const held = counted(takenBy.length, "check")
  const over = `${held} judged ${counted(change.changed.length, "file")}`
  if (said.length === 0) {
    return { report: [`${over}, and none refused`, ...also], refusals: [], code: 0 }
  }
  const whole = said.map((one) => `${one.path} — ${one.reason}`)
  const at = keeping === null ? null : keeping(whole)
  const lines = said.map((one) => `${one.path} — ${reasonSaid(one.reason, REASON_CEILING)}`)
  const kept = heldTo(lines, ANSWER_CEILING)
  const unrun = said.filter((one) => one.threw === true).length
  const could =
    unrun > 0
      ? [`${counted(unrun, "check")} could not run and judged nothing, so this answer is short`]
      : []
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} in all`, ...could, ...also],
    refusals: at === null ? kept : [...kept, pointerFor(at)],
    code: unrun > 0 ? 3 : 2,
  }
}

export async function audit(argv: readonly string[], given: Given): Promise<Answer> {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  let every: readonly Gathered[]
  let change: Change
  try {
    every = checksIn(root)
    change = everythingIn(root)
  } catch (thrown) {
    return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
  }
  const atAudit = checksAt(every, AUDIT)
  const narrowed = narrowedTo(every, atAudit, meant.only)
  const over = narrowedOver(change, meant.paths)
  const refusals = [...narrowed.refusals, ...over.refusals]
  if (refusals.length > 0) return { report: [], refusals, code: 1 }
  const also = [
    ...notAnAuditIn(
      leftOutOf(atAudit, narrowed.checks),
      over.change.changed.length,
      change.changed.length
    ),
    ...notYetJudgingIn(every, meant.only),
  ]
  const wholly = whollyFor(meant.paths, root)
  const page = given.agentId === null ? null : agentPathOf(root, given.agentId)
  const keeping: Keeping | null = page === null ? null : (whole) => refusalsPut(root, page, whole)
  return await judgedOver(judgingBy(narrowed.checks, "audit", wholly), over.change, also, keeping)
}
