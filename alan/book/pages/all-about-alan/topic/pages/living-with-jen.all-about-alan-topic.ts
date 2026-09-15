import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const livingWithJen = {
  id: "01a06559-9d65-7245-981e-7df4a4d1368a",
  type: "all-about-alan-topic",
  slug: "living-with-jen",
  title: "Living With Jen",
  definition: "being married to Jen, and what sharing a house asks of each of us",
  parents: ["all-about-alan-topic/alan"],
} as const satisfies AllAboutAlanTopic
