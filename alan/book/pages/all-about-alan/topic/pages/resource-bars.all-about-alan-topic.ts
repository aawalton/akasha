import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const resourceBars = {
  id: "01a06559-9d65-78ba-8142-49ff88480b26",
  type: "page-type/all-about-alan-topic",
  slug: "resource-bars",
  title: "Resource Bars",
  definition: "how much I have of each thing I run on",
  parents: ["all-about-alan-topic/resources"],
} as const satisfies AllAboutAlanTopic
