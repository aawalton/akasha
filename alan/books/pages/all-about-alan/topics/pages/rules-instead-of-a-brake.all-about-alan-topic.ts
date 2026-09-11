import type { AllAboutAlanTopic } from "akasha/alan/books/pages/all-about-alan/topics/all-about-alan-topic.page-type.types.ts"

export const rulesInsteadOfABrake = {
  id: "01a06559-9d65-7f6a-bcc0-a846fb135460",
  type: "all-about-alan-topic",
  slug: "rules-instead-of-a-brake",
  title: "Rules Instead Of A Brake",
  definition: "the standing rules I use to keep myself from overreaching",
  parents: ["how-i-decide"],
  related: ["not-wanting-to-is-the-gauge"],
  settled: "I keep them written down because nothing in the moment tells me to stop.",
} as const satisfies AllAboutAlanTopic
