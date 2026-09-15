import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const stressLevel = {
  id: "01a06559-9d65-77b3-a1ac-3d111f60aa25",
  type: "all-about-alan-topic",
  slug: "stress-level",
  title: "Stress Level",
  definition: "how much my body is having to handle right now",
  parents: ["all-about-alan-topic/safety-stack"],
  settled: "My stress capacity is roughly this level's cost added up over time.",
} as const satisfies AllAboutAlanTopic
