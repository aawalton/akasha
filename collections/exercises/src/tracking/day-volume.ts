import { fieldBool, fieldNum, fieldStr } from "../cli/lib/fields"
import { type AskPages, getPages } from "../pages/access"
import type { Page } from "../pages/page"
import { computeSessionVolume, type VolumeSetInput } from "./volume"

interface ExerciseLoad {
  readonly loadFactor: number | undefined
  readonly implementCount: number | undefined
}

export function toVolumeInputs(
  setLogRows: readonly Page[],
  loadByExerciseSlug: ReadonlyMap<string, ExerciseLoad>
): readonly VolumeSetInput[] {
  return setLogRows.map((row) => {
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    const info = exerciseSlug !== undefined ? loadByExerciseSlug.get(exerciseSlug) : undefined
    return {
      reps: fieldNum(row, "reps"),
      weight: fieldNum(row, "weight"),
      isWarmup: fieldBool(row, "isWarmup"),
      activityType: fieldStr(row, "activityType"),
      loadFactor: info?.loadFactor,
      implementCount: info?.implementCount,
    }
  })
}

export async function loadClientBodyweightWith(ask: AskPages): Promise<number> {
  const profiles = await ask({
    pageTypeSlug: "client-profile",
    select: ["id", "bodyweight"],
  })
  const bodyweight =
    profiles.rows[0] !== undefined ? fieldNum(profiles.rows[0], "bodyweight") : undefined
  if (bodyweight === undefined) {
    throw new Error("no client-profile row states a bodyweight, so volume would count it as zero")
  }
  return bodyweight
}

export function loadClientBodyweight(): Promise<number> {
  return loadClientBodyweightWith(getPages)
}

export async function loadSessionVolumeWith(
  ask: AskPages,
  sessionSlug: string,
  bodyweight: number
): Promise<number> {
  const setLogs = await ask({
    pageTypeSlug: "set-log",
    where: [{ key: "sessionSlug", eq: sessionSlug }],
  })
  const exerciseSlugs = [
    ...new Set(
      setLogs.rows
        .map((row) => fieldStr(row, "exerciseSlug"))
        .filter((slug): slug is string => slug !== undefined)
    ),
  ]
  const loadByExerciseSlug = new Map<string, ExerciseLoad>()
  if (exerciseSlugs.length > 0) {
    const exercises = await ask({
      pageTypeSlug: "exercise",
      where: [{ key: "slug", in: exerciseSlugs }],
      select: ["id", "slug", "loadFactor", "implementCount"],
    })
    for (const row of exercises.rows) {
      if (row.slug === null) continue
      loadByExerciseSlug.set(row.slug, {
        loadFactor: fieldNum(row, "loadFactor"),
        implementCount: fieldNum(row, "implementCount"),
      })
    }
  }
  return computeSessionVolume(toVolumeInputs(setLogs.rows, loadByExerciseSlug), bodyweight)
}

export function loadSessionVolume(sessionSlug: string, bodyweight: number): Promise<number> {
  return loadSessionVolumeWith(getPages, sessionSlug, bodyweight)
}

/**
 * A day's strength volume, read of whichever store the caller asks of.
 *
 * The day the points recompute wants is read out of the checkout, not out of the remote index, so
 * the caller hands in the ask rather than this file reaching for one. Reaching for `getPages` here
 * is what made the recompute die on `400: 'client-profile' names no page type the index holds`
 * before the first figure of the night was computed.
 */
export async function loadDayVolumeWith(ask: AskPages, dayStr: string): Promise<number> {
  const bodyweight = await loadClientBodyweightWith(ask)
  const sessions = await ask({
    pageTypeSlug: "workout-session",
    where: [{ key: "date", eq: dayStr }],
    select: ["id", "slug"],
  })
  let total = 0
  for (const session of sessions.rows) {
    if (session.slug === null) continue
    total += await loadSessionVolumeWith(ask, session.slug, bodyweight)
  }
  return total
}
