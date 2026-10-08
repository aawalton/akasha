import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const safetyStack = {
  id: "01a06559-9d65-746e-904a-971f5291bb0d",
  type: "page-type/all-about-alan-topic",
  slug: "safety-stack",
  title: "Safety Stack",
  definition: "the layered reading of what I can handle",
  parents: ["all-about-alan-topic/alan"],
  settled:
    "Each layer is built from the one below it.\n\nStress is the instantaneous reading. Stress capacity is the first integral of it. Safety is the second.",
  createdAt: "2026-09-03T03:39:26.949Z",
  updatedAt: "2026-09-21T20:03:16.000Z",
} as const satisfies AllAboutAlanTopic
