import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatILetMyselfTakeOn = {
  id: "01a06559-9d65-7202-898d-51bf99d98056",
  type: "page-type/all-about-alan-topic",
  slug: "what-i-let-myself-take-on",
  title: "What I Let Myself Take On",
  definition: "what I will and will not agree to do",
  parents: ["all-about-alan-topic/safety-bar"],
  settled: "Below my safety line a thing is free, at it bearable, above it off the table.",
} as const satisfies AllAboutAlanTopic
