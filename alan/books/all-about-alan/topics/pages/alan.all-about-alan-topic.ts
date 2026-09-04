import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const alan = {
  id: "01a06559-9d65-7e24-bae0-040ff962a609",
  pageTypeSlug: "all-about-alan-topic",
  slug: "alan",
  title: "Alan",
  definition: "who I am",
  settled: "Every other topic in this book sits under this one.",
} as const satisfies AllAboutAlanTopic
