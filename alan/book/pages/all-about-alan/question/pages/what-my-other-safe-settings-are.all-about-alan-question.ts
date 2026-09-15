import type { AllAboutAlanQuestion } from "akasha/alan/book/pages/all-about-alan/question/all-about-alan-question.page-type.types.ts"

export const whatMyOtherSafeSettingsAre = {
  id: "01a077e8-a243-7d90-9d70-84f6c7983225",
  type: "page-type/all-about-alan-question",
  slug: "what-my-other-safe-settings-are",
  topic: "all-about-alan-topic/building-a-setting-i-can-be-safe-in",
  ask: "What are my settings I can be safe in beyond the text rig, which is the one worked so far?",
} as const satisfies AllAboutAlanQuestion
