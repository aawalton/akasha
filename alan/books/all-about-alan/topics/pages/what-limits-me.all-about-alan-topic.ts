import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatLimitsMe = {
  id: "01a06559-9d65-7d23-b40f-0049ff04c4db",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-limits-me",
  title: "What Limits Me",
  definition: "the one resource holding everything else up",
  parents: ["resources"],
  settled: "It is one at a time, and which one it is changes as I recover.",
} as const satisfies AllAboutAlanTopic
