import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const safetyStack = {
  id: "01a06559-9d65-746e-904a-971f5291bb0d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "safety-stack",
  title: "Safety Stack",
  definition: "the layered reading of what I can handle",
  parentSlugs: ["alan"],
  settled: "Each layer is built from the one below it.",
} as const satisfies AllAboutAlanTopic
