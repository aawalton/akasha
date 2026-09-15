import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const moneyBar = {
  id: "01a06559-9d65-7ba1-8603-dd6e5ee30ad8",
  type: "page-type/all-about-alan-topic",
  slug: "money-bar",
  title: "Money Bar",
  definition: "how much money I have",
  parents: ["all-about-alan-topic/resource-bars"],
} as const satisfies AllAboutAlanTopic
