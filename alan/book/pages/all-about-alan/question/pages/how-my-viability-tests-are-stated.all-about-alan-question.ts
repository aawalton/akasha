import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howMyViabilityTestsAreStated = {
  id: "01a077e1-ff8f-7d25-8ce1-6c92ffc04a4b",
  type: "page-type/all-about-alan-question",
  slug: "how-my-viability-tests-are-stated",
  topic: "all-about-alan-topic/getting-out-from-under-a-dependency",
  ask: "What are my cost ceiling, quality floor, transition and durability tests, stated well enough to stop being informal?",
} as const satisfies AllAboutAlanQuestion
