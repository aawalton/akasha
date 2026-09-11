import type { WorkedDay } from "akasha/alan/track/daily/days/day.page-type.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

export const work: Work<WorkedDay, string> = (page) => {
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
