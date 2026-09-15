import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const howTheWiderWorldDrainsMySafety = {
  id: "01a077e7-a0ec-79f4-8379-075b65b6464c",
  type: "page-type/all-about-alan-question",
  slug: "how-the-wider-world-drains-my-safety",
  topic: "all-about-alan-topic/safety-bar",
  ask: "How does the wider world drain my safety bar, as a steady drain separate from home, from work and from the people in front of me?",
} as const satisfies AllAboutAlanQuestion
