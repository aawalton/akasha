import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherTheRoomsCostIsFixed = {
  id: "01a077eb-177e-7447-809c-63a8bbb7ba6e",
  type: "all-about-alan-question",
  slug: "whether-the-rooms-cost-is-fixed",
  topic: "all-about-alan-topic/how-much-attention-i-have",
  ask: "Is the cost of processing the room genuinely fixed, or does that cost go up in a louder room?",
} as const satisfies AllAboutAlanQuestion
