import type { Answer } from "@akasha/command-system/calling"
import { readBodyweight } from "@akasha/exercise-access/selection-policy"
import { fieldStr } from "@collections/exercises/cli/fields"
import { resolveOpenSession } from "@collections/exercises/cli/resolve"
import { patchPage } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import { loadSessionVolume } from "@collections/exercises/tracking/day-volume"
import {
  asJson,
  DATA,
  JSON_SAID,
  refusedBy,
  rowsOf,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const SESSION = "--session"

const NOTES = "--notes"

const SHAPE = { valued: [SESSION, NOTES], switches: [JSON_SAID] }

const MS_PER_MINUTE = 60_000

export function durationOf(startedAt: string | undefined, completedAt: string): number | null {
  const started = startedAt === undefined ? Number.NaN : Date.parse(startedAt)
  if (Number.isNaN(started)) return null
  return Math.max(0, Math.round((Date.parse(completedAt) - started) / MS_PER_MINUTE))
}

export function notesUnder(
  standing: string | undefined,
  added: string | undefined
): string | undefined {
  if (added === undefined) return undefined
  if (standing === undefined || standing === "") return added
  return `${standing}\n\n${added}`
}

export async function exerciseSessionFinish(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)

  try {
    const session = await resolveOpenSession(said.named[SESSION])
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const completedAt = new Date().toISOString()
    const merged = notesUnder(fieldStr(session, "notes"), said.named[NOTES])
    const values: Record<string, Json> = {
      workoutSessionCompletedAt: completedAt,
      ...(merged !== undefined ? { notes: merged } : {}),
    }
    await patchPage("workout-session", session.slug, values)

    const durationMin = durationOf(fieldStr(session, "workoutSessionStartedAt"), completedAt)
    const totalVolume = await loadSessionVolume(session.slug, readBodyweight())

    if (wantsJson(said)) return asJson({ id: session.id, completedAt, durationMin, totalVolume })
    return told(
      rowsOf([
        ["id", session.id],
        ["duration", durationMin === null ? "-" : `${durationMin}m`],
        ["totalVolume", String(totalVolume)],
      ])
    )
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
