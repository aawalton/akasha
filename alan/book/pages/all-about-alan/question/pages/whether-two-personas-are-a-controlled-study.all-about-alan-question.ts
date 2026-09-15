import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTwoPersonasAreAControlledStudy = {
  id: "01a077ee-87df-77b1-aadf-d4af7c135654",
  type: "page-type/all-about-alan-question",
  slug: "whether-two-personas-are-a-controlled-study",
  topic: "all-about-alan-topic/the-women-i-made-out-of-myself",
  ask: "Somebody else's reading is that two personas are a controlled study on myself, one holding the world fixed and varying me and the other the reverse. Does that reading hold?",
} as const satisfies AllAboutAlanQuestion
