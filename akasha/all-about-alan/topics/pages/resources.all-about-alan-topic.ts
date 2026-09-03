import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const resources = {
  id: "01a06559-9d65-7585-b9af-59a8dd59364d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "resources",
  title: "Resources",
  definition: "what I run on, and how I tell how much of each is left",
  parentSlugs: ["alan"],
} as const satisfies AllAboutAlanTopic
