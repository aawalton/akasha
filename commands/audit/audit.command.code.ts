import { resolve } from "node:path"
import { everythingIn } from "@akasha/checks/change-walking"
import type { Gathered } from "@akasha/checks/checking"
import { checksAt, checksIn, judgingBy } from "@akasha/checks/checking"
import type { Judged, Judging } from "@akasha/checks/judging"
import type { Change } from "@akasha/pages-system/change"
import { counted } from "../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { oneLine, whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const ANSWER_CEILING = 28000

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

export async function judgedOver(
  judging: Judging,
  change: Change,
  also: readonly string[]
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
  const lines = said.map((one) => `${one.path} — ${oneLine(one.reason)}`)
  const unrun = said.filter((one) => one.threw === true).length
  const could =
    unrun > 0
      ? [`${counted(unrun, "check")} could not run and judged nothing, so this answer is short`]
      : []
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} in all`, ...could, ...also],
    refusals: heldTo(lines, ANSWER_CEILING),
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
  const also = notAnAuditIn(
    leftOutOf(atAudit, narrowed.checks),
    over.change.changed.length,
    change.changed.length
  )
  return await judgedOver(judgingBy(narrowed.checks, "audit"), over.change, also)
}
