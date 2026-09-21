import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherJenStillNeverRatesBelowThree = {
  id: "01a0c653-d39c-7c82-ac44-668b3bf0d3ed",
  type: "page-type/all-about-alan-question",
  slug: "whether-jen-still-never-rates-below-three",
  topic: "all-about-alan-topic/how-much-company-i-can-take",
  ask: "I settled that time with Jen never rates below difficulty three, but my session record counts four Jen sessions rated one or two, three of them since 20 September. Has the never stopped holding?",
} as const satisfies AllAboutAlanQuestion
