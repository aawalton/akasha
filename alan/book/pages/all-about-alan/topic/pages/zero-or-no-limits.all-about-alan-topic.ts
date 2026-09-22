import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const zeroOrNoLimits = {
  id: "01a0c9eb-e227-797e-b1f5-025f3e04fc6a",
  type: "page-type/all-about-alan-topic",
  slug: "zero-or-no-limits",
  title: "Zero Or No Limits",
  definition: "why my stable positions are the extremes rather than a bounded rule between them",
  parents: ["all-about-alan-topic/alternating-instead-of-moderating"],
  related: [
    "all-about-alan-topic/getting-back-to-making-with-my-hands",
    "all-about-alan-topic/what-i-let-myself-take-on",
    "all-about-alan-topic/the-scaffolding-i-built",
  ],
  settled:
    "I have a hard time moderating, so zero and no limits are my most stable positions.\n\nA bounded rule between them still is not really stable for me. I have tried to set them, and they tend to break in one direction or the other. That is what I mean by unstable.\n\nWith Legos I cannot afford no limits yet, so what I run is a long zero and a rare splurge, thrown by my overall budget rather than by a rule.",
} as const satisfies AllAboutAlanTopic
