import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTheWordGaveMe = {
  id: "01a0c596-1acc-7f62-a92e-4b9098e0f8dd",
  type: "page-type/all-about-alan-topic",
  slug: "what-the-word-gave-me",
  title: "What The Word Gave Me",
  definition: "the three things naming it supplied that my old name for it never did",
  parents: ["all-about-alan-topic/how-i-found-out-i-am-autistic"],
  related: [
    "all-about-alan-topic/how-far-back-i-expect-to-come",
    "all-about-alan-topic/why-settling-a-question-steadies-me",
  ],
  settled:
    "Stress disorder covered the symptoms and explained nothing underneath them.\n\nAutism gave me three things together. A mechanism, so the symptoms cohered instead of piling up. A body of autistic adults comparing what works and what does not. And particular things to try, where before there was only trial and error.\n\nSo a name is not mainly for being believed. It is the move from guessing to experiments a mechanism and a community point at.\n\nThe name sits upstream of the work. The work is what moves the curve.",
} as const satisfies AllAboutAlanTopic
