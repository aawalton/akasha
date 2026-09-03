import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const stressLevel = {
  id: "01a06559-9d65-77b3-a1ac-3d111f60aa25",
  pageTypeSlug: "all-about-alan-topic",
  slug: "stress-level",
  title: "Stress Level",
  definition: "how much my body is having to handle right now",
  parentSlugs: ["safety-stack"],
  settled: "My stress capacity is roughly this level's cost added up over time.",
  unsettled:
    "What actually fails when the lights go at low resources has no physiology attached to it: sympathetic dominance, vagal withdrawal, or the stress axis.\n\nThis and my capacity get used for each other in the record, so which of the two a given statement is about is often unsettled. The time constants between them are uncaptured, and so is what an intervention does to either.",
} as const satisfies AllAboutAlanTopic
