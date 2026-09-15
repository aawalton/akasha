import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherLongServingStaffCountAsContinuity = {
  id: "01a077ee-d27a-7a89-944e-859a6d42b34a",
  type: "page-type/all-about-alan-question",
  slug: "whether-long-serving-staff-count-as-continuity",
  topic: "all-about-alan-topic/when-a-company-changes-hands",
  ask: "My leaning is no. Do long-serving staff count as continuity once the leaders turn over?",
} as const satisfies AllAboutAlanQuestion
