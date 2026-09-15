import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const notWantingToIsTheGauge = {
  id: "01a06559-9d65-73c5-9c38-c2134c5f2d54",
  type: "all-about-alan-topic",
  slug: "not-wanting-to-is-the-gauge",
  title: "Not Wanting To Is The Gauge",
  definition: "the one signal my body gives me when a resource is running out",
  parents: ["all-about-alan-topic/resources"],
  related: ["all-about-alan-topic/rules-instead-of-a-brake"],
  settled: "It is not wanting to, and it says a bar is low without saying which one.",
} as const satisfies AllAboutAlanTopic
