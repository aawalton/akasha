import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatMySensesCostMe = {
  id: "01a06559-9d65-700d-bc9b-2f84095854c3",
  type: "all-about-alan-topic",
  slug: "what-my-senses-cost-me",
  title: "What My Senses Cost Me",
  definition: "what sound, light and touch take out of me",
  parents: ["all-about-alan-topic/safety-bar"],
  related: ["all-about-alan-topic/how-much-attention-i-have"],
  settled: "It moves with how safe I feel rather than staying fixed.",
} as const satisfies AllAboutAlanTopic
