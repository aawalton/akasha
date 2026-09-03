import { loadDayHealthTaskPoints } from "../task-completions/task-completions.module.code.ts"
import {
  type WriteOutcome,
  writeTaskPoints,
} from "../write-daily-points/write-daily-points.module.code.ts"

export async function rollupHealthTaskPointsForDay(
  dayStr: string
): Promise<{ taskPoints: number; outcome: WriteOutcome }> {
  const taskPoints = await loadDayHealthTaskPoints(dayStr)
  const outcome = await writeTaskPoints(dayStr, taskPoints)
  return { taskPoints, outcome }
}
