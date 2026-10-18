import { watchActiveCalories } from "akasha/alan/track/daily/modules/day-active-calories/day-active-calories.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchActiveCalories()
  return await NEVER
}
