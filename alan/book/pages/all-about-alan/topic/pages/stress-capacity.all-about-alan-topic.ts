import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const stressCapacity = {
  id: "01a06559-9d65-78ec-ba0b-8372ba60ca4d",
  type: "all-about-alan-topic",
  slug: "stress-capacity",
  title: "Stress Capacity",
  definition: "how much my body has left to handle what comes",
  parents: ["all-about-alan-topic/safety-stack"],
  related: ["all-about-alan-topic/health-bar"],
} as const satisfies AllAboutAlanTopic
