import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const safetyLevel = {
  id: "01a06559-9d65-7700-b42c-16b3182c13c6",
  pageTypeSlug: "all-about-alan-topic",
  slug: "safety-level",
  title: "Safety Level",
  definition: "how settled my body is underneath the day",
  parentSlugs: ["safety-stack"],
  relatedSlugs: ["safety-bar"],
  settled:
    "It is roughly my stress capacity averaged over time.\n\nI read it as about nine involuntary gates rather than as a number, coarse on purpose so a bad reading costs sharpness rather than the whole read.\n\nWorking above my rung pays cost out of the same average that sets the price, so it comes down while I work.\n\nI drop the difficulty sooner or later, either by my tooling smoothing out or when it is time to go to sleep.",
  unsettled:
    "The time constants of that averaging, and how it adjusts, are not captured. The recovery side is now anchored — an hour of sleep gives back one capacity hour, the Nuropod three — but the window the averaging runs over is still open.\n\nLevel four is written both as vulnerable and as able to be vulnerable, opposites. Which I meant is mine to settle.",
} as const satisfies AllAboutAlanTopic
