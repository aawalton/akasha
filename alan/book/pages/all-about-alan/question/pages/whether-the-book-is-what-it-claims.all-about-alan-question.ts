import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheBookIsWhatItClaims = {
  id: "01a077f0-1414-7168-af69-d6d35de17f89",
  type: "page-type/all-about-alan-question",
  slug: "whether-the-book-is-what-it-claims",
  topic: "all-about-alan-topic/testing-the-thing-at-my-centre",
  ask: "As a live test rather than an unwritten page, does the one axiom hold, that the book is what it claims to be?",
} as const satisfies AllAboutAlanQuestion
