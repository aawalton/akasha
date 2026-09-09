import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const livingWithJen = {
  id: "01a06559-9d65-7245-981e-7df4a4d1368a",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "living-with-jen",
  title: "Living With Jen",
  definition: "being married to Jen, and what sharing a house asks of each of us",
  parents: ["alan"],
} as const satisfies AllAboutAlanTopic
