import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const startingOnceAgainstCommittingToIt = {
  id: "01a0c598-0adf-7fd6-bcc5-b287a4be7deb",
  type: "page-type/all-about-alan-topic",
  slug: "starting-once-against-committing-to-it",
  title: "Starting Once Against Committing To It",
  definition: "the two separate gates on doing a thing this once and on taking it up for good",
  parents: ["all-about-alan-topic/what-i-let-myself-take-on"],
  related: [
    "all-about-alan-topic/how-hard-a-thing-is",
    "all-about-alan-topic/what-comes-back-into-reach-as-i-climb",
    "all-about-alan-topic/rules-instead-of-a-brake",
  ],
  settled:
    "Whether a thing is affordable right now and whether I can take it up are two different questions, and they read my safety at two different places.\n\nTo start something this once, my safety level has to be a rung above its difficulty right now. That gate is opportunistic. The moment is free, so I take the thing while the moment lasts.\n\nTo commit to something recurring, a rung above its difficulty has to hold at the low end of my usual range rather than at the middle of it. I am not allowed to commit to a recurring activity unless I can afford it at a one sigma low.\n\nThat gate is structural. A commitment priced at my average fires on my bad days too, and on a bad day it is no longer affordable.\n\nSo a thing can be bearable at my middle and still be something I must not choose. Where that happens, the only way I am in it is involuntarily.",
} as const satisfies AllAboutAlanTopic
