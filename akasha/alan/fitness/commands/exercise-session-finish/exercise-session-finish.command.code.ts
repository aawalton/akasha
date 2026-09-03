import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { openSession } from "@akasha/exercise-access/exercise-finding"
import { textIn } from "@akasha/exercise-access/exercise-rows"
import { sessionVolume, statedBodyweight } from "@akasha/exercise-access/session-volume"
import { listedAt } from "@akasha/indexes"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
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

const WORKOUT_SESSION = "workout-session"

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

  const found = await openSession(said.named[SESSION], new Date())
  if ("refused" in found) return refusedBy([found.refused], DATA)
  const session = found.row
  if (session.slug === null) {
    return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
  }

  const listed = listedAt(given.root, WORKOUT_SESSION, session.slug)
  const at = listed.length === 1 ? listed[0]?.path : undefined
  const was = at === undefined ? null : valueAt(at, given.root)
  if (was === null) {
    return refusedBy(
      [`\`${WORKOUT_SESSION}/${session.slug}\` would not load, so what it holds is unknown`],
      DATA
    )
  }

  const completedAt = new Date().toISOString()
  const merged = notesUnder(textIn(session, "notes"), said.named[NOTES])
  const values: Value = {
    ...was,
    workoutSessionCompletedAt: completedAt,
    ...(merged !== undefined ? { notes: merged } : {}),
  }
  const composed = composedFor(given.root, {
    pageTypeSlug: WORKOUT_SESSION,
    slug: session.slug,
    values,
  })
  if ("refused" in composed) return refusedBy([composed.refused], DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const landed = landingAsked(given, {
    changes,
    message: `finish the session ${session.slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (landed.code !== 0) return landed

  const durationMin = durationOf(textIn(session, "workoutSessionStartedAt"), completedAt)
  const weighed = await statedBodyweight()
  if ("refused" in weighed) return refusedBy([weighed.refused], DATA)
  const counted = await sessionVolume(session.slug, weighed.bodyweight)
  if ("refused" in counted) return refusedBy([counted.refused], DATA)

  if (wantsJson(said)) {
    return asJson({ id: session.id, completedAt, durationMin, totalVolume: counted.volume })
  }
  return told([
    ...rowsOf([
      ["id", session.id],
      ["duration", durationMin === null ? "-" : `${durationMin}m`],
      ["totalVolume", String(counted.volume)],
    ]),
    ...landed.report,
  ])
}
