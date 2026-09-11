import type { AllAboutAlanTopic } from "akasha/alan/books/pages/all-about-alan/topics/all-about-alan-topic.page-type.types.ts"

export const feelingAffection = {
  id: "01a06559-9d65-7588-8b11-8147bb264836",
  type: "all-about-alan-topic",
  slug: "feeling-affection",
  title: "Feeling Affection",
  definition: "the signal is there and it runs too quiet to notice",
  parents: ["working-out-what-love-is"],
  settled: "It needs amplifying rather than defining.",
} as const satisfies AllAboutAlanTopic
