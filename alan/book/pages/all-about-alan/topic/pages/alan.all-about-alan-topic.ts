import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const alan = {
  id: "01a06559-9d65-7e24-bae0-040ff962a609",
  type: "page-type/all-about-alan-topic",
  slug: "alan",
  title: "Alan",
  definition: "who I am",
  settled: "Every other topic in this book sits under this one.",
  createdAt: "2026-09-03T03:39:26.949Z",
  updatedAt: "2026-09-15T15:47:51.000Z",
} as const satisfies AllAboutAlanTopic
