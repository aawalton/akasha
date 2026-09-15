import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const callingItWhatItWas = {
  id: "01a06559-9d65-7d63-b849-4cb533c1707c",
  type: "page-type/all-about-alan-topic",
  slug: "calling-it-what-it-was",
  title: "Calling It What It Was",
  definition: "coming to name what happened at home as abuse, and what the naming does",
  parents: ["all-about-alan-topic/why-people-read-as-unsafe"],
  related: [
    "all-about-alan-topic/turning-punishment-into-self-hatred",
    "all-about-alan-topic/digging-up-an-old-belief",
  ],
  settled: "The recognition came as an arc: cared for, then neglected, then abused.",
} as const satisfies AllAboutAlanTopic
