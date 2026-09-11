import type { AllAboutAlanTopic } from "akasha/alan/books/pages/all-about-alan/topics/all-about-alan-topic.page-type.types.ts"

export const moneyBar = {
  id: "01a06559-9d65-7ba1-8603-dd6e5ee30ad8",
  type: "all-about-alan-topic",
  slug: "money-bar",
  title: "Money Bar",
  definition: "how much money I have",
  parents: ["resource-bars"],
} as const satisfies AllAboutAlanTopic
