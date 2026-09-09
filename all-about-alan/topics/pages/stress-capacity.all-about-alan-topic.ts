import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const stressCapacity = {
  id: "01a06559-9d65-78ec-ba0b-8372ba60ca4d",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "stress-capacity",
  title: "Stress Capacity",
  definition: "how much my body has left to handle what comes",
  parents: ["safety-stack"],
  related: ["health-bar"],
} as const satisfies AllAboutAlanTopic
