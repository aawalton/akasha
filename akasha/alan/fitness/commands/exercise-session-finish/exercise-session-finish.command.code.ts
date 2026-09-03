import type { Answer, Given } from "@akasha/command-system/calling"
import { openSession } from "@akasha/exercise-access/exercise-finding"
import { textIn } from "@akasha/exercise-access/exercise-rows"
import { readBodyweight } from "@akasha/exercise-access/selection-policy"
import { sessionVolume } from "@akasha/exercise-access/session-volume"
import type { Value } from "@akasha/pages-system/page-value"
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
import { editsFor, landed, standingAt } from "../exercise-writing/exercise-writing.module.code.ts"

const SESSION = "--session"

const NOTES = "--notes"

const SHAPE = { valued: [SESSION, NOTES], switches: [JSON_SAID] }

const MS_PER_MINUTE = 60_000

const WORKOUT_SESSION = "workout-session"

const NOTHING = "-"

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

export async function exerciseSessionFinish(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)

  try {
    const found = await openSession(said.named[SESSION], new Date())
    if ("refused" in found) return refusedBy([found.refused], DATA)
    const session = found.row
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const completedAt = new Date().toISOString()
    const merged = notesUnder(textIn(session, "notes"), said.named[NOTES])
    const was = standingAt(given.root, WORKOUT_SESSION, session.slug)
    if ("refused" in was) return refusedBy([was.refused], DATA)
    if (was.values === null) {
      return refusedBy([`no ${WORKOUT_SESSION} page stands at ${session.slug}`], DATA)
    }
    const values: Value = {
      ...was.values,
      workoutSessionCompletedAt: completedAt,
      ...(merged !== undefined ? { notes: merged } : {}),
    }
    const edits = editsFor(given.root, [
      { pageTypeSlug: WORKOUT_SESSION, slug: session.slug, values },
    ])
    if ("refused" in edits) return refusedBy([edits.refused], DATA)
    const answer = landed(given, edits.changes, `close the session ${session.slug}`)
    if (answer.code !== 0) return answer

    const durationMin = durationOf(textIn(session, "workoutSessionStartedAt"), completedAt)
    const counted = await sessionVolume(session.slug, readBodyweight())
    if ("refused" in counted) return refusedBy([counted.refused], DATA)

    if (wantsJson(said)) {
      return asJson({
        id: session.id,
        slug: session.slug,
        completedAt,
        durationMin,
        totalVolume: counted.volume,
      })
    }
    return told([
      ...rowsOf([
        ["id", session.id],
        ["duration", durationMin === null ? NOTHING : `${durationMin}m`],
        ["totalVolume", String(counted.volume)],
      ]),
      ...answer.report,
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
