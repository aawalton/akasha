import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMakingThingsWithTheGirlsQuietsTheAlarm = {
  id: "01a077eb-6c36-7459-8e93-7832e8a1cc42",
  type: "page-type/all-about-alan-question",
  slug: "whether-making-things-with-the-girls-quiets-the-alarm",
  topic: "all-about-alan-topic/why-making-things-hurts",
  ask: "Does making things alongside the girls raise safety enough to quiet the alarm?",
} as const satisfies AllAboutAlanQuestion
