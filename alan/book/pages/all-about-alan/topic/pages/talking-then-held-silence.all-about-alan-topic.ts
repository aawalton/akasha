import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const talkingThenHeldSilence = {
  id: "01a15eb7-5478-73a1-b9c0-9864bf8d488d",
  type: "page-type/all-about-alan-topic",
  slug: "talking-then-held-silence",
  title: "Talking Then Held Silence",
  definition: "alternating talk that feeds Jen with silence that feeds the Child",
  parents: ["all-about-alan-topic/the-tests-for-what-could-feed-the-child"],
  related: [
    "all-about-alan-topic/how-jen-connects-through-words",
    "all-about-alan-topic/alternating-instead-of-moderating",
  ],
  settled:
    "Where Jen and I cannot combine what feeds her with what feeds the Child, alternating might work: first we talk, which feeds Jen and runs the Professor, then she holds me in silence, which feeds the Child. That is the order the night of 20 October 2026 went in.",
  createdAt: "2026-10-21T13:47:15.447Z",
  updatedAt: "2026-10-21T13:47:15.447Z",
} as const satisfies AllAboutAlanTopic
