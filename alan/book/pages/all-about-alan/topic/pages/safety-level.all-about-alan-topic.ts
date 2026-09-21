import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const safetyLevel = {
  id: "01a06559-9d65-7700-b42c-16b3182c13c6",
  type: "page-type/all-about-alan-topic",
  slug: "safety-level",
  title: "Safety Level",
  definition: "how settled my body is underneath the day",
  parents: ["all-about-alan-topic/safety-stack"],
  related: ["all-about-alan-topic/safety-bar"],
  settled:
    "It is roughly my stress capacity averaged over time.\n\nThe rate is about four hours of stress capacity to half a level, which is what makes it slow to move and slow to come back.\n\nI read it as about nine involuntary gates rather than as a number, coarse on purpose so a bad reading costs sharpness rather than the whole read.\n\nWorking above my rung pays cost out of the same average that sets the price, so it comes down while I work.\n\nI drop the difficulty sooner or later, either by my tooling smoothing out or when it is time to go to sleep.",
} as const satisfies AllAboutAlanTopic
