import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whichUncapturedResourcePullsHold = {
  id: "01a077e3-a519-75bc-ba79-812d68522ee8",
  type: "page-type/all-about-alan-question",
  slug: "which-uncaptured-resource-pulls-hold",
  topic: "all-about-alan-topic/how-the-bars-pull-on-each-other",
  ask: "Does low safety drain my mana, does low stamina cap my mana, and does low capacity lower my mana and stamina ceiling?",
} as const satisfies AllAboutAlanQuestion
