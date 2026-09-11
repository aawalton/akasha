import type { AllAboutAlanTopic } from "akasha/alan/books/pages/all-about-alan/topics/all-about-alan-topic.page-type.types.ts"

export const safetyBar = {
  id: "01a06559-9d65-7300-bfe0-8b06411d3c77",
  type: "all-about-alan-topic",
  slug: "safety-bar",
  title: "Safety Bar",
  definition: "the calm my body can hold",
  parents: ["resource-bars"],
  related: ["safety-level"],
} as const satisfies AllAboutAlanTopic
