import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const myLifeSatisfaction = {
  id: "01a19720-3c0c-7bdd-8553-81a38089fd14",
  type: "page-type/all-about-alan-topic",
  slug: "my-life-satisfaction",
  title: "My Life Satisfaction",
  definition: "where I put my life on a zero to ten scale, and where it has been lately",
  parents: ["all-about-alan-topic/safety-level"],
  related: [
    "all-about-alan-topic/how-far-my-safety-scale-runs",
    "all-about-alan-topic/the-rungs-of-my-safety-scale",
    "all-about-alan-topic/my-safety-read-in-medians",
    "all-about-alan-topic/the-month-i-crossed-five",
  ],
  settled:
    "On a scale of zero to ten I am at three right now. The highest I can remember reaching is five, and the lowest is minus two.\n\nI estimated those numbers separately from my safety level, but they feel like they are on the same scale, and my hypothesis is that the two are one construct. I am not certain of it.\n\nI have been living in the one to three range lately and have spent very little time at four or five. I do feel a lot better at four and above.\n\nRelational conflict and spending more than I can afford, the two patterns that were holding me down in September, have not been happening lately, and I still have not broken past three. That is a big part of the discouragement.",
  createdAt: "2026-11-01T12:40:34.571Z",
  updatedAt: "2026-11-01T12:40:34.571Z",
} as const satisfies AllAboutAlanTopic
