import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatAScarIsMadeOf = {
  id: "01a0c9e5-04a0-75fe-aac8-19a0fd80bcf7",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-scar-is-made-of",
  title: "What A Scar Is Made Of",
  definition: "a conditioned response to association with pain I could not afford",
  parents: ["all-about-alan-topic/why-making-things-hurts"],
  related: [
    "all-about-alan-topic/where-the-scar-ends",
    "all-about-alan-topic/what-lets-a-judgement-in",
    "all-about-alan-topic/the-best-friend-quilts-i-made",
  ],
  settled:
    "My scars are operant conditioned trauma responses to association with pain I could not afford.\n\nNot all of them come from being judged. Judgement is one way the pain arrives rather than what a scar is made of.\n\nThe association can arrive long after the thing it attaches to. With the best friend quilts the pain association came later, when I left on my mission and we lost even the friend level of connection.",
} as const satisfies AllAboutAlanTopic
