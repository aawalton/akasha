import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const resources = {
  id: "01a06559-9d65-7585-b9af-59a8dd59364d",
  type: "page-type/all-about-alan-topic",
  slug: "resources",
  title: "Resources",
  definition: "what I run on, and how I tell how much of each is left",
  parents: ["all-about-alan-topic/alan"],
} as const satisfies AllAboutAlanTopic
