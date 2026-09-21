import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howCriticalADependencyIs = {
  id: "01a0c592-5c0d-7868-8354-1aec981bbb6e",
  type: "page-type/all-about-alan-topic",
  slug: "how-critical-a-dependency-is",
  title: "How Critical A Dependency Is",
  definition: "how much of my life fails if a thing I lean on goes away",
  parents: ["all-about-alan-topic/which-dependency-i-deal-with-first"],
  settled:
    "Life-critical means losing it threatens my physical safety, my ability to earn, or my ability to keep living in this house. Utilities, healthcare for anything active, my income.\n\nHigh means weeks to months of work to recover. Banking, my main transport, my main communications.\n\nMedium means real disruption I could work through in a few weeks. Secondary services, recurring purchases I lean on but could replace.\n\nLow means inconvenience. A subscription I would miss and could live without.\n\nThe score is on the category rather than on whoever provides it. It measures how much I need the thing, not how much I need them.",
} as const satisfies AllAboutAlanTopic
