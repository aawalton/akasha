import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { chosenIn, countIn, decimalIn } from "@akasha/exercise-access/exercise-choosing"
import { exerciseNamed, openSession } from "@akasha/exercise-access/exercise-finding"
import { numberIn, rowsFor, titleOf } from "@akasha/exercise-access/exercise-rows"
import { nextSetNumber, setLogSlug } from "@akasha/exercise-access/session-derive"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { firstOf, JSON_SAID, proseIn, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const SET_LOG = "set-log"

const ACTIVITY_TYPES = ["cardio", "mobility"] as const

const EXERCISE = "--exercise"

const TYPE = "--type"

const DURATION = "--duration"

const HOLD = "--hold"

const DISTANCE = "--distance"

const NOTE = "--note"

const SESSION = "--session"

const SET_NUMBER = "--set-number"

const SECONDS_A_MINUTE = 60

const AT_MOST = 200

const NOTHING = "-"

export async function exerciseLogActivity(argv: readonly string[], given: Given): Promise<Answer> {
  const reading = saidIn(
    argv,
    [EXERCISE, TYPE, DURATION, HOLD, DISTANCE, NOTE, `${NOTE}-file`, SESSION, SET_NUMBER],
    [JSON_SAID],
    1
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const ref = firstOf(said, EXERCISE)
  if (ref === undefined) {
    return refused(`\`${EXERCISE}\` names the movement, and this call names none`, INPUT)
  }
  const typeSaid = said.held.get(TYPE)
  if (typeSaid === undefined) {
    return refused(`\`${TYPE}\` says which sort of activity, and this call names none`, INPUT)
  }
  const activityType = chosenIn(TYPE, typeSaid, ACTIVITY_TYPES)
  if ("refused" in activityType) return refused(activityType.refused, INPUT)

  const minutes = decimalIn(DURATION, said.held.get(DURATION))
  if ("refused" in minutes) return refused(minutes.refused, INPUT)
  const held = decimalIn(HOLD, said.held.get(HOLD))
  if ("refused" in held) return refused(held.refused, INPUT)
  if (minutes.number !== undefined && held.number !== undefined) {
    return refused(
      `\`${DURATION}\` and \`${HOLD}\` each say how long it ran, and this call gives both`,
      INPUT
    )
  }
  const durationSeconds =
    minutes.number !== undefined ? Math.round(minutes.number * SECONDS_A_MINUTE) : held.number

  const distance = decimalIn(DISTANCE, said.held.get(DISTANCE))
  if ("refused" in distance) return refused(distance.refused, INPUT)
  const note = proseIn(said, NOTE)
  if ("refused" in note) return refused(note.refused, INPUT)
  const numbered = countIn(SET_NUMBER, said.held.get(SET_NUMBER))
  if ("refused" in numbered) return refused(numbered.refused, INPUT)
  const json = said.bare.has(JSON_SAID)

  const session = await openSession(said.held.get(SESSION), new Date())
  if ("refused" in session) return refused(session.refused, DATA)
  const exercise = await exerciseNamed(ref)
  if ("refused" in exercise) return refused(exercise.refused, DATA)
  if (session.row.slug === null)
    return refused(`the session ${session.row.id} carries no slug`, DATA)
  if (exercise.row.slug === null) {
    return refused(`the movement ${exercise.row.id} carries no slug`, DATA)
  }

  const already = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [
      { key: "sessionSlug", eq: session.row.slug },
      { key: "exerciseSlug", eq: exercise.row.slug },
    ],
    limit: AT_MOST,
  })
  if ("unread" in already) return refused(already.unread, DATA)
  const setNumber =
    numbered.number ??
    nextSetNumber(
      already.rows.map((row) => numberIn(row, "setNumber")).filter((one) => one !== undefined)
    )

  const named = titleOf(exercise.row)
  const slug = setLogSlug(session.row.slug, exercise.row.slug, setNumber)
  const values: Record<string, Value> = {
    title: `${named} ${activityType.chosen} ${setNumber}`,
    sessionSlug: session.row.slug,
    exerciseSlug: exercise.row.slug,
    setNumber,
    activityType: activityType.chosen,
    ...(durationSeconds !== undefined ? { durationSeconds } : {}),
    ...(distance.number !== undefined ? { distance: distance.number } : {}),
    ...(note.text !== undefined ? { note: note.text } : {}),
  }

  const composed = composedFor(given.root, { pageTypeSlug: SET_LOG, slug, values })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const answer = landingAsked(given, {
    changes,
    message: `record ${named} ${activityType.chosen} ${setNumber}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer

  const told = json
    ? JSON.stringify({
        path: composed.put.path,
        exercise: named,
        setNumber,
        activityType: activityType.chosen,
        durationSeconds: durationSeconds ?? null,
        distance: distance.number ?? null,
        note: note.text ?? null,
        session: session.row.slug,
      })
    : `path\t${composed.put.path}\nexercise\t${named}\nsetNumber\t${setNumber}\nactivityType\t${activityType.chosen}\ndurationSeconds\t${durationSeconds ?? NOTHING}\nnote\t${note.text ?? NOTHING}`
  return { report: json ? [told] : [told, ...answer.report], refusals: [], code: 0 }
}
