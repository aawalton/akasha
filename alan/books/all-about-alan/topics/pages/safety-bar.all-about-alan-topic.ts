import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const safetyBar = {
  id: "01a06559-9d65-7300-bfe0-8b06411d3c77",
  pageTypeSlug: "all-about-alan-topic",
  slug: "safety-bar",
  title: "Safety Bar",
  definition: "the calm my body can hold",
  parentSlugs: ["resource-bars"],
  relatedSlugs: ["safety-level"],
  unsettled:
    "The wider world is its own steady drain on this, separate from home and work and the people in front of me, and it has never been worked on its own.",
} as const satisfies AllAboutAlanTopic
