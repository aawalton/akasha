import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const safetyYears = {
  id: "01a06559-9d65-76b8-97c5-e525090bea64",
  pageTypeSlug: "all-about-alan-topic",
  slug: "safety-years",
  title: "Safety Years",
  definition: "how much safe time I have behind me",
  parentSlugs: ["safety-stack"],
  settled: "It is my average safety level multiplied by years, so a year at level one is one.",
} as const satisfies AllAboutAlanTopic
