import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

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
