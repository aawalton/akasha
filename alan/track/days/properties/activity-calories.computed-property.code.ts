import type { Work } from "@akasha/pages/computed-property"
import type { Day } from "../day.page-type.ts"
import type { StrengthCalories } from "./strength-calories.computed-property.ts"

export const work: Work<Day, number> = (page) => {
  const worked = page as Day & { strengthCalories?: StrengthCalories }
  return (worked.activeCalories ?? 0) + (worked.strengthCalories ?? 0)
}
