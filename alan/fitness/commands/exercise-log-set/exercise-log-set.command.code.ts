import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { countIn, decimalIn } from "@akasha/exercise-access/exercise-choosing"
import { exerciseNamed, openSession } from "@akasha/exercise-access/exercise-finding"
import { numberIn, rowsFor, titleOf } from "@akasha/exercise-access/exercise-rows"
import { nextSetNumber, setLogSlug } from "@akasha/exercise-access/session-derive"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { firstOf, JSON_SAID, proseIn, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const SET_LOG = "set-log"

const EXERCISE = "--exercise"

const REPS = "--reps"

const WEIGHT = "--weight"

const RPE = "--rpe"

const NOTE = "--note"

const WARMUP = "--warmup"

const SESSION = "--session"

const SET_NUMBER = "--set-number"

const AT_MOST = 200

const NOTHING = "-"

export async function exerciseLogSet(argv: readonly string[], given: Given): Promise<Answer> {
  const reading = saidIn(
    argv,
    [EXERCISE, REPS, WEIGHT, RPE, NOTE, `${NOTE}-file`, SESSION, SET_NUMBER],
    [WARMUP, JSON_SAID],
    1
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const ref = firstOf(said, EXERCISE)
  if (ref === undefined) {
    return refused(`\`${EXERCISE}\` names the movement, and this call names none`, INPUT)
  }
  const repsSaid = countIn(REPS, said.held.get(REPS))
  if ("refused" in repsSaid) return refused(repsSaid.refused, INPUT)
  if (repsSaid.number === undefined) {
    return refused(`\`${REPS}\` says how many were performed, and this call says none`, INPUT)
  }
  const weight = decimalIn(WEIGHT, said.held.get(WEIGHT))
  if ("refused" in weight) return refused(weight.refused, INPUT)
  const rpe = decimalIn(RPE, said.held.get(RPE))
  if ("refused" in rpe) return refused(rpe.refused, INPUT)
  const note = proseIn(said, NOTE)
  if ("refused" in note) return refused(note.refused, INPUT)
  const setNumber = countIn(SET_NUMBER, said.held.get(SET_NUMBER))
  if ("refused" in setNumber) return refused(setNumber.refused, INPUT)
  const warmup = said.bare.has(WARMUP)
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
    setNumber.number ??
    nextSetNumber(
      already.rows.map((row) => numberIn(row, "setNumber")).filter((one) => one !== undefined)
    )

  const named = titleOf(exercise.row)
  const slug = setLogSlug(session.row.slug, exercise.row.slug, setNumber)
  const values: Value = {
    title: `${named} set ${setNumber}`,
    sessionSlug: session.row.slug,
    exerciseSlug: exercise.row.slug,
    setNumber,
    reps: repsSaid.number,
    isWarmup: warmup,
    ...(weight.number !== undefined ? { weight: weight.number } : {}),
    ...(rpe.number !== undefined ? { rpe: rpe.number } : {}),
    ...(note.text !== undefined ? { note: note.text } : {}),
  }

  const composed = composedFor(given.root, { pageTypeSlug: SET_LOG, slug, values })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const answer = await landingAsked(given, {
    changes,
    message: `record ${named} set ${setNumber}`,
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
        reps: repsSaid.number,
        weight: weight.number ?? null,
        rpe: rpe.number ?? null,
        note: note.text ?? null,
        isWarmup: warmup,
        session: session.row.slug,
      })
    : `path\t${composed.put.path}\nexercise\t${named}\nsetNumber\t${setNumber}\nreps\t${repsSaid.number}\nweight\t${weight.number ?? NOTHING}\nnote\t${note.text ?? NOTHING}`
  return { report: json ? [told] : [told, ...answer.report], refusals: [], code: 0 }
}
