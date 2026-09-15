import type { WorkedDay } from "akasha/alan/track/daily/day/day.page-type.ts"
import type { Stoplights } from "akasha/alan/track/daily/day/properties/stoplights.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

export const work: Work<WorkedDay, Stoplights> = (page) => {
  const lights = [
    page.faithStoplight,
    page.loveStoplight,
    page.healthStoplight,
    page.learnStoplight,
    page.funStoplight,
    page.wealthStoplight,
  ]
  let text = ""
  for (const light of lights) {
    if (typeof light !== "string") return null
    text += light
  }
  return text
}
