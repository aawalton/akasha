import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whoStartsIt = {
  id: "01a0c59c-7112-7473-8d16-fab0b45dfd00",
  type: "page-type/all-about-alan-topic",
  slug: "who-starts-it",
  title: "Who Starts It",
  definition: "the implicit contract that takes initiating sex off me",
  parents: ["all-about-alan-topic/what-sex-with-jen-is-like"],
  related: ["all-about-alan-topic/how-we-have-paced-it"],
  settled:
    "I always had a hard time navigating initiating sex, with some painful experiences early on.\n\nSo we developed an implicit contract. She initiates when she is ready, and I almost always respond. Yes about ninety-nine percent of the time.\n\nThat routes around the part that was costly for me, and it keys the pacing to her cycle-aligned need, which is the reliable signal between us.",
} as const satisfies AllAboutAlanTopic
