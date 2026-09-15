import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const safetyBar = {
  id: "01a06559-9d65-7300-bfe0-8b06411d3c77",
  type: "page-type/all-about-alan-topic",
  slug: "safety-bar",
  title: "Safety Bar",
  definition: "the calm my body can hold",
  parents: ["all-about-alan-topic/resource-bars"],
  related: ["all-about-alan-topic/safety-level"],
} as const satisfies AllAboutAlanTopic
