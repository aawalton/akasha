import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherJenIsConflictAble = {
  id: "01a0c654-346c-7763-8574-5a8a63e25ae8",
  type: "page-type/all-about-alan-question",
  slug: "whether-jen-is-conflict-able",
  topic: "all-about-alan-topic/what-makes-a-person-expensive",
  ask: "My notes had it that Jen is conflict-able, neither seeking conflict out nor avoiding it, and nothing on record is behind it. Is that right?",
} as const satisfies AllAboutAlanQuestion
