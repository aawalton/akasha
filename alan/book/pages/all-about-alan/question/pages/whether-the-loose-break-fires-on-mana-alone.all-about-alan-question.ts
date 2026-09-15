import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheLooseBreakFiresOnManaAlone = {
  id: "01a077eb-75f2-7efb-8232-e3f71b51f183",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-loose-break-fires-on-mana-alone",
  topic: "all-about-alan-topic/defaulting-to-too-much-protection",
  ask: "Does my loose break fire on mana alone or on mana and safety together?",
} as const satisfies AllAboutAlanQuestion
