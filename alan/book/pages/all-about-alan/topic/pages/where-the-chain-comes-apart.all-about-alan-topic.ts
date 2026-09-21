import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereTheChainComesApart = {
  id: "01a0c5f8-204c-7115-b4c7-bb36c7b93e0d",
  type: "page-type/all-about-alan-topic",
  slug: "where-the-chain-comes-apart",
  title: "Where The Chain Comes Apart",
  definition: "the five things that look like one thing and move independently",
  parents: ["all-about-alan-topic/arousal-times-safety"],
  settled:
    "The law leaves room for movement between arousal, sexual arousal, attraction, connection and the act itself.\n\nNone of them carries the next with it. Each is its own term, and any of them can move while the rest stay where they are.",
} as const satisfies AllAboutAlanTopic
