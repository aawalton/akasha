import {
  boolIn,
  numberIn,
  type Row,
  rowsFor,
  textIn,
} from "../exercise-rows/exercise-rows.module.code.ts"
import { computeSessionVolume, type VolumeSetInput } from "../set-volume/set-volume.module.code.ts"

const SET_LOG = "set-log"

const EXERCISE = "exercise"

const WORKOUT_SESSION = "workout-session"

const CLIENT_PROFILE = "client-profile"

export type Counted = { readonly volume: number } | { readonly refused: string }

export type Weighed = { readonly bodyweight: number } | { readonly refused: string }

export interface ExerciseLoad {
  readonly loadFactor: number | undefined
  readonly implementCount: number | undefined
}

export function volumeSetsIn(
  setLogs: readonly Row[],
  loadBySlug: ReadonlyMap<string, ExerciseLoad>
): readonly VolumeSetInput[] {
  return setLogs.map((row) => {
    const exerciseSlug = textIn(row, "exerciseSlug")
    const held = exerciseSlug === undefined ? undefined : loadBySlug.get(exerciseSlug)
    return {
      reps: numberIn(row, "reps"),
      weight: numberIn(row, "weight"),
      isWarmup: boolIn(row, "isWarmup"),
      activityType: textIn(row, "activityType"),
      loadFactor: held?.loadFactor,
      implementCount: held?.implementCount,
    }
  })
}

export function loadsIn(exercises: readonly Row[]): ReadonlyMap<string, ExerciseLoad> {
  const held = new Map<string, ExerciseLoad>()
  for (const row of exercises) {
    if (row.slug === null) continue
    held.set(row.slug, {
      loadFactor: numberIn(row, "loadFactor"),
      implementCount: numberIn(row, "implementCount"),
    })
  }
  return held
}

export function exerciseSlugsIn(setLogs: readonly Row[]): readonly string[] {
  return [
    ...new Set(
      setLogs
        .map((row) => textIn(row, "exerciseSlug"))
        .filter((slug): slug is string => slug !== undefined)
    ),
  ]
}

export async function statedBodyweight(): Promise<Weighed> {
  const found = await rowsFor({ pageTypeSlug: CLIENT_PROFILE, select: ["id", "bodyweight"] })
  if ("unread" in found) return { refused: found.unread }
  const first = found.rows[0]
  const bodyweight = first === undefined ? undefined : numberIn(first, "bodyweight")
  if (bodyweight === undefined) {
    return {
      refused:
        "no `client-profile` page states a bodyweight, and volume counted without one counts every " +
        "bodyweight movement as nothing",
    }
  }
  return { bodyweight }
}

export async function sessionVolume(sessionSlug: string, bodyweight: number): Promise<Counted> {
  const logs = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "sessionSlug", eq: sessionSlug }],
  })
  if ("unread" in logs) return { refused: logs.unread }
  const slugs = exerciseSlugsIn(logs.rows)
  let loads: ReadonlyMap<string, ExerciseLoad> = new Map()
  if (slugs.length > 0) {
    const exercises = await rowsFor({
      pageTypeSlug: EXERCISE,
      where: [{ key: "slug", in: slugs }],
      select: ["id", "slug", "loadFactor", "implementCount"],
    })
    if ("unread" in exercises) return { refused: exercises.unread }
    loads = loadsIn(exercises.rows)
  }
  return { volume: computeSessionVolume(volumeSetsIn(logs.rows, loads), bodyweight) }
}

export async function dayVolume(dayStr: string): Promise<Counted> {
  const weighed = await statedBodyweight()
  if ("refused" in weighed) return weighed
  const sessions = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "workoutSessionDate", eq: dayStr }],
    select: ["id", "slug"],
  })
  if ("unread" in sessions) return { refused: sessions.unread }
  let total = 0
  for (const session of sessions.rows) {
    if (session.slug === null) continue
    const counted = await sessionVolume(session.slug, weighed.bodyweight)
    if ("refused" in counted) return counted
    total += counted.volume
  }
  return { volume: total }
}
