import { dataError } from "@akasha/errors-core/exit-code"
import { asking } from "@akasha/pages-service/asking"
import { entryKeysDeclared } from "../day-entry-keys/day-entry-keys.module.code.ts"
import { checkoutRoot, WAKE_DAY } from "../day-place/day-place.module.code.ts"

const COMPLETED_TASKS = "completed-tasks"

const COMPLETED_TASKS_KEY = "completedTasks"

const COMPLETION_KEYS = ["toDoSlug", "completedAt", "valueSlug"] as const

export function completedTasksInSpan(
  fromInstant: Date,
  beforeInstant: Date
): readonly Readonly<Record<string, unknown>>[] {
  const root = checkoutRoot()
  const declared = entryKeysDeclared(root, COMPLETED_TASKS, "a round of a to-do Alan finished")
  for (const key of COMPLETION_KEYS) {
    if (declared.has(key)) continue
    throw dataError(
      `a round of a to-do Alan finished declares no \`${key}\`, so what he finished is unknown ` +
        `rather than nothing. the keys are ${[...declared].sort().join(", ")}`
    )
  }
  const asked = asking(root, {
    pageTypeSlug: WAKE_DAY,
    keys: ["slug", COMPLETED_TASKS_KEY],
  } as never)
  if ("refused" in asked) {
    throw dataError(`reading the rounds of to-dos Alan finished: ${asked.refused}`)
  }
  const from = fromInstant.toISOString()
  const before = beforeInstant.toISOString()
  const rows: Readonly<Record<string, unknown>>[] = []
  for (const day of asked.rows) {
    const held = day[COMPLETED_TASKS_KEY]
    if (held === undefined) continue
    if (!Array.isArray(held)) {
      throw dataError(
        `the rounds finished beside \`${String(day["slug"])}\` are no list, so they are unread`
      )
    }
    for (const one of held) {
      const row = one as Readonly<Record<string, unknown>>
      const at = row["completedAt"]
      if (typeof at !== "string" || at < from || at >= before) continue
      rows.push(row)
    }
  }
  const at = (row: Readonly<Record<string, unknown>>): string => String(row["completedAt"])
  rows.sort((one, other) => (at(one) < at(other) ? -1 : at(one) > at(other) ? 1 : 0))
  return rows
}
