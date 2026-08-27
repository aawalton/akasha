import { fieldBool, fieldNum, fieldStr } from "../cli/lib/fields"
import { getPages } from "../pages/access"
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

export async function loadClientBodyweight(): Promise<number> {
  const profiles = await getPages({
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

export async function loadSessionVolume(sessionSlug: string, bodyweight: number): Promise<number> {
  const setLogs = await getPages({
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
    const exercises = await getPages({
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

export async function loadDayVolume(dayStr: string): Promise<number> {
  const bodyweight = await loadClientBodyweight()
  const sessions = await getPages({
    pageTypeSlug: "workout-session",
    where: [{ key: "date", eq: dayStr }],
    select: ["id", "slug"],
  })
  let total = 0
  for (const session of sessions.rows) {
    if (session.slug === null) continue
    total += await loadSessionVolume(session.slug, bodyweight)
  }
  return total
}
