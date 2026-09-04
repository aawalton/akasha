import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { countIn } from "@akasha/exercise-access/exercise-choosing"
import { exerciseNamed } from "@akasha/exercise-access/exercise-finding"
import { numberIn, rowsFor, textIn, titleOf } from "@akasha/exercise-access/exercise-rows"
import { bestSet, type SetLine } from "@akasha/exercise-access/set-history"
import { firstOf, JSON_SAID, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const SET_LOG = "set-log"

const WORKOUT_SESSION = "workout-session"

const EXERCISE = "--exercise"

const LIMIT = "--limit"

const HOW_MANY = 20

const NOTHING = "-"

function dayOrder(one: SetLine, other: SetLine): number {
  const left = one.date ?? ""
  const right = other.date ?? ""
  if (left !== right) return left < right ? 1 : -1
  return (other.setNumber ?? 0) - (one.setNumber ?? 0)
}

export async function exerciseHistory(argv: readonly string[], _given: Given): Promise<Answer> {
  const reading = saidIn(argv, [EXERCISE, LIMIT], [JSON_SAID], 1)
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const ref = firstOf(said, EXERCISE)
  if (ref === undefined) {
    return refused(`\`${EXERCISE}\` names the movement to read, and this call names none`, INPUT)
  }
  const counted = countIn(LIMIT, said.held.get(LIMIT))
  if ("refused" in counted) return refused(counted.refused, INPUT)
  const limit = counted.number ?? HOW_MANY
  const json = said.bare.has(JSON_SAID)

  const found = await exerciseNamed(ref)
  if ("refused" in found) return refused(found.refused, DATA)
  const exercise = found.row
  if (exercise.slug === null) return refused(`the movement ${exercise.id} carries no slug`, DATA)

  const logs = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "exerciseSlug", eq: exercise.slug }],
    order: [{ by: "sessionSlug", dir: "desc" }],
    limit,
  })
  if ("unread" in logs) return refused(logs.unread, DATA)

  const sessionSlugs = [
    ...new Set(
      logs.rows.map((row) => textIn(row, "sessionSlug")).filter((one) => one !== undefined)
    ),
  ]
  const dayBySession = new Map<string, string>()
  if (sessionSlugs.length > 0) {
    const sessions = await rowsFor({
      pageTypeSlug: WORKOUT_SESSION,
      where: [{ key: "slug", in: sessionSlugs }],
      limit: sessionSlugs.length,
    })
    if ("unread" in sessions) return refused(sessions.unread, DATA)
    for (const row of sessions.rows) {
      const day = textIn(row, "workoutSessionDate")
      if (day !== undefined && row.slug !== null) dayBySession.set(row.slug, day)
    }
  }

  const lines: SetLine[] = logs.rows
    .map((row) => {
      const sessionSlug = textIn(row, "sessionSlug")
      return {
        date: sessionSlug !== undefined ? (dayBySession.get(sessionSlug) ?? null) : null,
        setNumber: numberIn(row, "setNumber") ?? null,
        reps: numberIn(row, "reps") ?? null,
        weight: numberIn(row, "weight") ?? null,
        rpe: numberIn(row, "rpe") ?? null,
      }
    })
    .sort(dayOrder)
  const best = bestSet(lines)
  const named = titleOf(exercise)

  if (json) {
    return {
      report: [JSON.stringify({ exercise: named, sets: lines, best })],
      refusals: [],
      code: 0,
    }
  }
  const report = [`exercise\t${named}`]
  for (const line of lines) {
    report.push(
      `set\t${line.date ?? NOTHING}\t${line.setNumber ?? NOTHING}\t${line.reps ?? NOTHING}\t${line.weight ?? NOTHING}\t${line.rpe ?? NOTHING}`
    )
  }
  report.push(
    best !== null
      ? `best\t${best.date ?? NOTHING}\t${best.weight}\t×${best.reps ?? NOTHING}`
      : `best\t${NOTHING}`
  )
  return { report, refusals: [], code: 0 }
}
