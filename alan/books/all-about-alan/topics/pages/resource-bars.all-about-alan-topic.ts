import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const resourceBars = {
  id: "01a06559-9d65-78ba-8142-49ff88480b26",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "resource-bars",
  title: "Resource Bars",
  definition: "how much I have of each thing I run on",
  parents: ["resources"],
} as const satisfies AllAboutAlanTopic
