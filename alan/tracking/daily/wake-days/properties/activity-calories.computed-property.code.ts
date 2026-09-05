import type { Work } from "@akasha/pages-system/computed-property"
import type { WakeDay } from "../wake-day.page-type.ts"
import type { StrengthCalories } from "./strength-calories.computed-property.ts"

export const work: Work<WakeDay, number> = (page) => {
  const worked = page as WakeDay & { strengthCalories?: StrengthCalories }
  return (worked.activeCalories ?? 0) + (worked.strengthCalories ?? 0)
}
