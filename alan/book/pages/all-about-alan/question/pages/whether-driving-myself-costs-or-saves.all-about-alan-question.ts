import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whetherDrivingMyselfCostsOrSaves = {
  id: "01a077ec-8a95-799f-bb17-237b980d531b",
  type: "all-about-alan-question",
  slug: "whether-driving-myself-costs-or-saves",
  topic: "all-about-alan-topic/driving-myself-like-a-machine",
  ask: "Does driving myself like a machine cost me something of its own, the way wearing a face does, or is it cheaper than acting on feeling because it skips that layer?",
} as const satisfies AllAboutAlanQuestion
