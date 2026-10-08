import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const stressLevel = {
  id: "01a06559-9d65-77b3-a1ac-3d111f60aa25",
  type: "page-type/all-about-alan-topic",
  slug: "stress-level",
  title: "Stress Level",
  definition: "how much my body is having to handle right now",
  parents: ["all-about-alan-topic/safety-stack"],
  settled: "My stress capacity is roughly this level's cost added up over time.",
  createdAt: "2026-09-03T03:39:26.949Z",
  updatedAt: "2026-09-15T15:47:51.000Z",
} as const satisfies AllAboutAlanTopic
