import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherParallelExcavationsIsAGate = {
  id: "01a077e8-7dd9-768b-a3f3-d34f04c8ca73",
  type: "page-type/all-about-alan-question",
  slug: "whether-parallel-excavations-is-a-gate",
  topic: "all-about-alan-topic/how-i-read-my-safety-level",
  ask: "Is running parallel excavations another gate, or was that one good day?",
} as const satisfies AllAboutAlanQuestion
