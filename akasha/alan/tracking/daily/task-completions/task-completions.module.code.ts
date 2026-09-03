import { getEsoDayWindow } from "@akasha/day/eso-day"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import { completedTasksInSpan } from "@tools/lib/tracking/day-place"
import { textOf } from "../day-scan-window/day-scan-window.module.code.ts"

const TO_DO_PAGE_TYPE_SLUG = "to-do"
const HEALTH_VALUE_SLUG = "health"

const TO_DO_SLUG = "slug"
const TO_DO_DIFFICULTY = "difficulty"
const TO_DO_VALUE_SLUG = "toDoValueSlug"
const TO_DO_LAST_COMPLETED_AT = "toDoLastCompletedAt"

const COMPLETION_TO_DO_SLUG = "toDoSlug"
const COMPLETION_VALUE_SLUG = "valueSlug"
const COMPLETION_AT = "completedAt"

export const DIFFICULTY_POINTS: Record<string, number> = {
  trivial: 25,
  light: 50,
  hard: 100,
  major: 250,
}

export function pointsForDifficulty(difficulty: unknown): number {
  if (typeof difficulty !== "string") return 0
  return DIFFICULTY_POINTS[difficulty] ?? 0
}

export function sumTaskPoints(difficulties: readonly unknown[]): number {
  let total = 0
  for (const difficulty of difficulties) total += pointsForDifficulty(difficulty)
  return total
}

export type TaskCompletion = {
  readonly toDoSlug: string
  readonly completedAt: string
}

export function collapseToOncePerTask(
  completions: readonly TaskCompletion[]
): readonly TaskCompletion[] {
  const seen = new Set<string>()
  const out: TaskCompletion[] = []
  for (const completion of completions) {
    if (seen.has(completion.toDoSlug)) continue
    seen.add(completion.toDoSlug)
    out.push(completion)
  }
  return out
}

export function filterCompletionsToWindow(
  completions: readonly TaskCompletion[],
  startIso: string,
  endIso: string
): readonly TaskCompletion[] {
  const startMs = Date.parse(startIso)
  const endMs = Date.parse(endIso)
  return completions.filter((c) => {
    const t = Date.parse(c.completedAt)
    return Number.isFinite(t) && t >= startMs && t < endMs
  })
}

type RollupRow = { readonly [key: string]: unknown }

export interface HealthRollupRows {
  readonly activeSources: readonly RollupRow[]
  readonly snapshots: readonly RollupRow[]
  readonly difficultyPool: readonly RollupRow[]
}

export function computeHealthTaskPointsForWindow(
  rows: HealthRollupRows,
  startIso: string,
  endIso: string
): number {
  const difficultyByToDo = new Map<string, unknown>()
  for (const row of rows.difficultyPool) {
    const slug = textOf(row.slug)
    if (slug !== undefined) difficultyByToDo.set(slug, row.difficulty)
  }
  const completions: TaskCompletion[] = []
  for (const row of rows.activeSources) {
    const slug = textOf(row.slug)
    const completedAt = textOf(row.completedAt)
    if (slug !== undefined && completedAt !== undefined) {
      completions.push({ toDoSlug: slug, completedAt })
    }
  }
  for (const row of rows.snapshots) {
    const slug = textOf(row.toDoSlug)
    const completedAt = textOf(row.completedAt)
    if (slug !== undefined && slug !== "none" && completedAt !== undefined) {
      completions.push({ toDoSlug: slug, completedAt })
    }
  }
  const windowed = filterCompletionsToWindow(completions, startIso, endIso)
  const unique = collapseToOncePerTask(windowed)
  return sumTaskPoints(unique.map((c) => difficultyByToDo.get(c.toDoSlug)))
}

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function toDosAsked(): readonly Readonly<Record<string, unknown>>[] {
  const asked = asking(checkoutRoot(), {
    pageTypeSlug: TO_DO_PAGE_TYPE_SLUG,
    keys: [TO_DO_SLUG, TO_DO_DIFFICULTY, TO_DO_VALUE_SLUG, TO_DO_LAST_COMPLETED_AT],
  } as never)
  if ("refused" in asked) throw new Error(`loadDayHealthTaskPoints: ${asked.refused}`)
  return asked.rows
}

export async function loadDayHealthTaskPoints(dayStr: string): Promise<number> {
  const window = getEsoDayWindow(dayStr)
  const startIso = window.start.toISOString()
  const endIso = window.end.toISOString()

  const toDos = toDosAsked()
  const finished = completedTasksInSpan(window.start, window.end)

  return computeHealthTaskPointsForWindow(
    {
      activeSources: toDos
        .filter((values) => values[TO_DO_VALUE_SLUG] === HEALTH_VALUE_SLUG)
        .map((values) => ({
          slug: values[TO_DO_SLUG],
          completedAt: values[TO_DO_LAST_COMPLETED_AT],
        })),
      snapshots: finished
        .filter((row) => row[COMPLETION_VALUE_SLUG] === HEALTH_VALUE_SLUG)
        .map((row) => ({
          toDoSlug: row[COMPLETION_TO_DO_SLUG],
          completedAt: row[COMPLETION_AT],
        })),
      difficultyPool: toDos.map((values) => ({
        slug: values[TO_DO_SLUG],
        difficulty: values[TO_DO_DIFFICULTY],
      })),
    },
    startIso,
    endIso
  )
}
