import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichJudgeHoldsEachDomain = {
  id: "01a0c5e8-4bc6-70d5-ad82-6e7f3f2b1093",
  type: "page-type/all-about-alan-question",
  slug: "which-judge-holds-each-domain",
  topic: "all-about-alan-topic/where-the-scar-ends",
  ask: "Per domain, which judge holds it, which event installed it and in what era. Making by hand is one fortress with its own founding date, and the list is askable one at a time.",
} as const satisfies AllAboutAlanQuestion
