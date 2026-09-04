import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatMySensesCostMe = {
  id: "01a06559-9d65-700d-bc9b-2f84095854c3",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-my-senses-cost-me",
  title: "What My Senses Cost Me",
  definition: "what sound, light and touch take out of me",
  parentSlugs: ["safety-bar"],
  relatedSlugs: ["how-much-attention-i-have"],
  settled: "It moves with how safe I feel rather than staying fixed.",
  unsettled:
    "The auditory case is worked and anchored. The visual side is inferred from it and has not been measured.\n\nI shift how bright I read at with the time of day without deciding to. Whether that tracks the clock itself, or something under it like how much light I can take or how tired my eyes are, is open.\n\nWhether the sensory-processing label names anything this does not already cover is an open framing question.",
} as const satisfies AllAboutAlanTopic
