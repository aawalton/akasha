import type { Answer } from "@akasha/command-system/calling"
import { readBodyweight } from "@akasha/exercise-access/selection-policy"
import { displayTitle, fieldBool, fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { resolveOpenSession } from "@collections/exercises/cli/resolve"
import { getPage, getPages } from "@collections/exercises/pages/access"
import type { Page } from "@collections/exercises/pages/page"
import type { VolumeSetInput } from "@collections/exercises/tracking/volume"
import { computeSessionVolume } from "@collections/exercises/tracking/volume"
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
  rows: readonly Page[],
  movements: ReadonlyMap<string, MovementInfo>
): readonly SetLine[] {
  return rows
    .map((row) => {
      const exerciseSlug = fieldStr(row, "exerciseSlug")
      const info = exerciseSlug !== undefined ? movements.get(exerciseSlug) : undefined
      return {
        exercise: info?.title ?? exerciseSlug ?? EMPTY,
        setNumber: fieldNum(row, "setNumber") ?? 0,
        reps: fieldNum(row, "reps"),
        weight: fieldNum(row, "weight"),
        rpe: fieldNum(row, "rpe"),
        isWarmup: fieldBool(row, "isWarmup") ?? false,
        note: fieldStr(row, "note"),
        activityType: fieldStr(row, "activityType"),
        durationSeconds: fieldNum(row, "durationSeconds"),
        distance: fieldNum(row, "distance"),
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

async function titleBySlug(pageTypeSlug: string, slug: string | undefined): Promise<string | null> {
  if (slug === undefined) return null
  const page = await getPage({ pageTypeSlug, where: [{ key: "slug", eq: slug }] })
  return page !== null ? displayTitle(page) : null
}

export async function exerciseSessionShow(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)

  try {
    const session = await resolveOpenSession(said.named[SESSION])
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const setLogs = await getPages({
      pageTypeSlug: "set-log",
      where: [{ key: "sessionSlug", eq: session.slug }],
    })
    const exerciseSlugs = [
      ...new Set(
        setLogs.rows
          .map((row) => fieldStr(row, "exerciseSlug"))
          .filter((slug): slug is string => slug !== undefined)
      ),
    ]
    const movements = new Map<string, MovementInfo>()
    if (exerciseSlugs.length > 0) {
      const rows = await getPages({
        pageTypeSlug: "exercise",
        where: [{ key: "slug", in: exerciseSlugs }],
        select: ["id", "slug", "title", "loadFactor", "implementCount"],
      })
      for (const row of rows.rows) {
        if (row.slug === null) continue
        movements.set(row.slug, {
          title: fieldStr(row, "title") ?? row.slug,
          loadFactor: fieldNum(row, "loadFactor"),
          implementCount: fieldNum(row, "implementCount"),
        })
      }
    }

    const bodyweight = readBodyweight()
    const volumeInputs: readonly VolumeSetInput[] = setLogs.rows.map((row) => {
      const exerciseSlug = fieldStr(row, "exerciseSlug")
      const info = exerciseSlug !== undefined ? movements.get(exerciseSlug) : undefined
      return {
        reps: fieldNum(row, "reps"),
        weight: fieldNum(row, "weight"),
        isWarmup: fieldBool(row, "isWarmup"),
        activityType: fieldStr(row, "activityType"),
        loadFactor: info?.loadFactor,
        implementCount: info?.implementCount,
      }
    })

    const header = {
      id: session.id,
      title: displayTitle(session),
      date: fieldStr(session, "date") ?? null,
      scheduleDay: await titleBySlug("schedule-day", fieldStr(session, "scheduleDaySlug")),
      startedAt: fieldStr(session, "startedAt") ?? null,
      completedAt: fieldStr(session, "completedAt") ?? null,
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
