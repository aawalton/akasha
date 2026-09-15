import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherMyDeclineThresholdsAreMine = {
  id: "01a077ec-fe39-7afe-939d-a3dda316ac46",
  type: "page-type/all-about-alan-question",
  slug: "whether-my-decline-thresholds-are-mine",
  topic: "all-about-alan-topic/eating-what-she-brings-me",
  ask: "Do the two thresholds on when I can decline hold in my own words, given both came from the model rather than from anything I said?",
} as const satisfies AllAboutAlanQuestion
