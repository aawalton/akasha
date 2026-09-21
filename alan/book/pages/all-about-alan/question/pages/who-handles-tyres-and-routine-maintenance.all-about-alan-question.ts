import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whoHandlesTyresAndRoutineMaintenance = {
  id: "01a0c604-08e3-7c6f-97fb-d12b76ee6e0f",
  type: "page-type/all-about-alan-question",
  slug: "who-handles-tyres-and-routine-maintenance",
  topic: "all-about-alan-topic/who-keeps-the-car-running",
  ask: "Tyres and routine maintenance are not accounted for anywhere. Does Edgemont Auto do those too, or is there a separate vendor I depend on and have never graded?",
} as const satisfies AllAboutAlanQuestion
