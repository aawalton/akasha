import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const reachingOutToKerry = {
  id: "01a06559-9d65-7aaa-9dfa-d0294ab66fa0",
  type: "page-type/all-about-alan-topic",
  slug: "reaching-out-to-kerry",
  title: "Reaching Out To Kerry",
  definition: "someone from before I have thought about contacting again",
  parents: ["all-about-alan-topic/being-alone-at-the-centre"],
} as const satisfies AllAboutAlanTopic
