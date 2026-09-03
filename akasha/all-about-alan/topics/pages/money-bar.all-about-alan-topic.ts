import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const moneyBar = {
  id: "01a06559-9d65-7ba1-8603-dd6e5ee30ad8",
  pageTypeSlug: "all-about-alan-topic",
  slug: "money-bar",
  title: "Money Bar",
  definition: "how much money I have",
  parentSlugs: ["resource-bars"],
} as const satisfies AllAboutAlanTopic
