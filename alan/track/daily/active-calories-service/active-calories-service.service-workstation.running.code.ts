import { runDayActiveCalories } from "akasha/alan/track/daily/day-active-calories/day-active-calories.module.code.ts"

export async function runService(): Promise<void> {
  await runDayActiveCalories()
}
