import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIActuallyBreathe = {
  id: "01a06559-9d65-7126-8ed8-24a2e6b573f1",
  type: "all-about-alan-topic",
  slug: "how-i-actually-breathe",
  title: "How I Actually Breathe",
  definition: "the breathing practice I run underneath everything else",
  parents: ["all-about-alan-topic/what-calms-me-down"],
  settled:
    "Four counts in and twelve out, most of my waking day.\n\nThe counting is what makes it meditative rather than only slow.",
} as const satisfies AllAboutAlanTopic
