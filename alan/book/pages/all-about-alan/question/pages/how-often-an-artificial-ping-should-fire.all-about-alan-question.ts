import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howOftenAnArtificialPingShouldFire = {
  id: "01a0c5a2-0930-7a82-a32b-091e057ba597",
  type: "page-type/all-about-alan-question",
  slug: "how-often-an-artificial-ping-should-fire",
  topic: "all-about-alan-topic/how-i-hold-a-goal",
  ask: "How often should a ping for a painless drift fire, when the missing signal is the reason the ping exists and so cannot tune it?",
} as const satisfies AllAboutAlanQuestion
