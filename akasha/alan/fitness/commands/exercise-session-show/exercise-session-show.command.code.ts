import type { Answer } from "@akasha/command-system/calling"
import { openSession } from "@akasha/exercise-access/exercise-finding"
import {
  boolIn,
  numberIn,
  type Row,
  rowFor,
  rowsFor,
  textIn,
  titleOf,
} from "@akasha/exercise-access/exercise-rows"
import { readBodyweight } from "@akasha/exercise-access/selection-policy"
import type { VolumeSetInput } from "@akasha/exercise-access/set-volume"
import { computeSessionVolume } from "@akasha/exercise-access/set-volume"
import {
  asJson,
  DATA,
  JSON_SAID,
  refusedBy,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const SESSION = "--session"

const SHAPE = { valued: [SESSION], switches: [JSON_SAID] }

const STRENGTH = "strength"

const EMPTY = "-"

const EXERCISE = "exercise"

const SET_LOG = "set-log"

const SCHEDULE_DAY = "schedule-day"

export type MovementInfo = {
  readonly title: string
  readonly loadFactor: number | undefined
  readonly implementCount: number | undefined
}

export type SetLine = {
  readonly exercise: string
  readonly setNumber: number
  readonly reps: number | undefined
  readonly weight: number | undefined
  readonly rpe: number | undefined
  readonly isWarmup: boolean
  readonly note: string | undefined
  readonly activityType: string | undefined
  readonly durationSeconds: number | undefined
  readonly distance: number | undefined
}

export function setLinesOf(
  rows: readonly Row[],
  movements: ReadonlyMap<string, MovementInfo>
): readonly SetLine[] {
  return rows
    .map((row) => {
      const exerciseSlug = textIn(row, "exerciseSlug")
      const info = exerciseSlug !== undefined ? movements.get(exerciseSlug) : undefined
      return {
        exercise: info?.title ?? exerciseSlug ?? EMPTY,
        setNumber: numberIn(row, "setNumber") ?? 0,
        reps: numberIn(row, "reps"),
        weight: numberIn(row, "weight"),
        rpe: numberIn(row, "rpe"),
        isWarmup: boolIn(row, "isWarmup") ?? false,
        note: textIn(row, "note"),
        activityType: textIn(row, "activityType"),
        durationSeconds: numberIn(row, "durationSeconds"),
        distance: numberIn(row, "distance"),
      }
    })
    .sort((a, b) => {
      const byMovement = a.exercise.localeCompare(b.exercise)
      return byMovement !== 0 ? byMovement : a.setNumber - b.setNumber
    })
}

export function rowOf(line: SetLine): string {
  return (
    `set\t${line.exercise}\t${line.setNumber}\t${line.activityType ?? STRENGTH}` +
    `\t${line.reps ?? EMPTY}\t${line.weight ?? EMPTY}\t${line.rpe ?? EMPTY}` +
    `\t${line.durationSeconds ?? EMPTY}\t${line.distance ?? EMPTY}\t${line.note ?? EMPTY}` +
    `${line.isWarmup ? "\twarmup" : ""}`
  )
}

async function titleBySlug(
  pageTypeSlug: string,
  slug: string | undefined
): Promise<{ readonly title: string | null } | { readonly refused: string }> {
  if (slug === undefined) return { title: null }
  const found = await rowFor({ pageTypeSlug, where: [{ key: "slug", eq: slug }] })
  if ("unread" in found) return { refused: found.unread }
  return { title: found.row === null ? null : titleOf(found.row) }
}

export async function exerciseSessionShow(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)

  try {
    const found = await openSession(said.named[SESSION], new Date())
    if ("refused" in found) return refusedBy([found.refused], DATA)
    const session = found.row
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const setLogs = await rowsFor({
      pageTypeSlug: SET_LOG,
      where: [{ key: "sessionSlug", eq: session.slug }],
    })
    if ("unread" in setLogs) return refusedBy([setLogs.unread], DATA)
    const exerciseSlugs = [
      ...new Set(
        setLogs.rows
          .map((row) => textIn(row, "exerciseSlug"))
          .filter((slug): slug is string => slug !== undefined)
      ),
    ]
    const movements = new Map<string, MovementInfo>()
    if (exerciseSlugs.length > 0) {
      const rows = await rowsFor({
        pageTypeSlug: EXERCISE,
        where: [{ key: "slug", in: exerciseSlugs }],
        select: ["id", "slug", "title", "loadFactor", "implementCount"],
        limit: exerciseSlugs.length,
      })
      if ("unread" in rows) return refusedBy([rows.unread], DATA)
      for (const row of rows.rows) {
        if (row.slug === null) continue
        movements.set(row.slug, {
          title: textIn(row, "title") ?? row.slug,
          loadFactor: numberIn(row, "loadFactor"),
          implementCount: numberIn(row, "implementCount"),
        })
      }
    }

    const bodyweight = readBodyweight()
    const volumeInputs: readonly VolumeSetInput[] = setLogs.rows.map((row) => {
      const exerciseSlug = textIn(row, "exerciseSlug")
      const info = exerciseSlug !== undefined ? movements.get(exerciseSlug) : undefined
      return {
        reps: numberIn(row, "reps"),
        weight: numberIn(row, "weight"),
        isWarmup: boolIn(row, "isWarmup"),
        activityType: textIn(row, "activityType"),
        loadFactor: info?.loadFactor,
        implementCount: info?.implementCount,
      }
    })

    const scheduleDay = await titleBySlug(SCHEDULE_DAY, textIn(session, "scheduleDaySlug"))
    if ("refused" in scheduleDay) return refusedBy([scheduleDay.refused], DATA)

    const header = {
      id: session.id,
      title: titleOf(session),
      date: textIn(session, "workoutSessionDate") ?? null,
      scheduleDay: scheduleDay.title,
      startedAt: textIn(session, "workoutSessionStartedAt") ?? null,
      completedAt: textIn(session, "workoutSessionCompletedAt") ?? null,
      totalVolume: computeSessionVolume(volumeInputs, bodyweight),
    }
    const lines = setLinesOf(setLogs.rows, movements)

    if (wantsJson(said)) return asJson({ ...header, sets: lines })
    return told([
      ...Object.entries(header).map(([key, value]) => `${key}\t${value ?? EMPTY}`),
      ...lines.map(rowOf),
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
