import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { SCRATCH_AT } from "../../../../../../command-system/scratching/scratching.module.code.ts"
import { mistaking } from "../../../../../modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../../modules/calling/calling.module.code.ts"
import { filing } from "../../../../../modules/mechanical-filing/mechanical-filing.module.code.ts"
import type { ActivityDifficulty } from "../../../../../modules/session-leveling/session-leveling.module.code.ts"
import {
  activitiesIn,
  BARE,
  DAY,
  dayNow,
  type Held,
  heldFor,
  linesOf,
  openIn,
  type RelationshipPage,
  type Row,
  relationshipsFor,
  relationshipsIn,
  saidFor,
  VALUED,
} from "../../../../../modules/session-rows/session-rows.module.code.ts"
import { dayBefore, sleeping, wokeInto } from "../../../../../modules/waking/waking.module.code.ts"
import {
  besideArgv,
  type Landing,
  pathUnder,
} from "../../file/day-landing/day-landing.module.code.ts"

export type Standing = {
  readonly day: string
  readonly held: Held
  readonly rows: Row[]
  readonly activities: readonly ActivityDifficulty[]
}

export type Tagging =
  | {
      readonly read: "tagging"
      readonly known: readonly RelationshipPage[]
      readonly stated: readonly string[] | null
    }
  | { readonly read: "refused"; readonly refusals: readonly string[] }

export type Ending = Landing & { readonly stretch: Row }

export function standingFor(argv: readonly string[], root: string, now: Date): Standing | string {
  for (const said of argv) {
    if (said.startsWith("--") && !VALUED.includes(said) && !BARE.includes(said)) {
      return `${said} is no flag this takes`
    }
  }
  const day = saidFor(argv, DAY) ?? dayNow(now)
  const held = heldFor(root, day)
  if (typeof held === "string") return held
  return { day, held, rows: held.rows.map((one) => ({ ...one })), activities: activitiesIn(root) }
}

export function taggingFor(argv: readonly string[], root: string): Tagging {
  const known = relationshipsIn(root)
  const reading = relationshipsFor(argv, known)
  if (reading === null) return { read: "tagging", known, stated: null }
  if (reading.read === "refused") return { read: "refused", refusals: reading.refusals }
  return { read: "tagging", known, stated: reading.ids }
}

export function telling(lines: string): Answer {
  return { report: lines === "" ? [] : [lines], refusals: [], code: 0 }
}

export async function landedAcross(
  landings: readonly Landing[],
  said: string,
  given: Given
): Promise<Answer> {
  const last = landings[landings.length - 1]
  if (last === undefined) return mistaking(["this act composed no day"])
  const body = new TextEncoder().encode(linesOf(last.rows))
  const scratch = mkdtempSync(join(SCRATCH_AT, "akasha-track-"))
  try {
    const argv = [...besideArgv(landings, scratch, given.root)]
    argv.push("--file-path", pathUnder(given.root, last.held.path), "--message", said)
    return await filing(argv, given, () => ({ bytes: body }))
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

export function landed(
  held: Held,
  rows: readonly Row[],
  said: string,
  given: Given
): Promise<Answer> {
  return landedAcross([{ held, rows: [...rows] }], said, given)
}

export function endingIn(
  root: string,
  day: string,
  held: Held,
  rows: Row[],
  switching: boolean
): Ending | string {
  const open = openIn(rows)
  if (open !== null) return { held, rows, stretch: open }
  if (switching) {
    const before = heldFor(root, dayBefore(day))
    if (typeof before !== "string") {
      const beforeRows = before.rows.map((one) => ({ ...one }))
      const found = openIn(beforeRows)
      if (found !== null && sleeping(found.title)) {
        return { held: before, rows: beforeRows, stretch: found }
      }
    }
  }
  return "this day carries no open stretch to end"
}

export function movedInto(root: string, from: Ending, ended: string): Landing | string {
  const target = heldFor(root, wokeInto(ended))
  if (typeof target === "string") return target
  const rows = target.rows.map((one) => ({ ...one }))
  from.rows.splice(from.rows.indexOf(from.stretch), 1)
  rows.push({ ...from.stretch, dailyTracking: target.page })
  rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  return { held: target, rows }
}
