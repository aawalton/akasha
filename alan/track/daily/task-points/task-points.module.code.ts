import { loadDayHealthTaskPoints } from "akasha/alan/track/daily/task-completions/task-completions.module.code.ts"
import {
  type WriteOutcome,
  writeTaskPoints,
} from "akasha/alan/track/daily/write-daily-points/write-daily-points.module.code.ts"

export async function rollupHealthTaskPointsForDay(
  dayStr: string
): Promise<{ taskPoints: number | null; outcome: WriteOutcome | "uncounted" }> {
  const taskPoints = await loadDayHealthTaskPoints(dayStr)
  if (taskPoints === null) return { taskPoints: null, outcome: "uncounted" }
  const outcome = await writeTaskPoints(dayStr, taskPoints)
  return { taskPoints, outcome }
}
