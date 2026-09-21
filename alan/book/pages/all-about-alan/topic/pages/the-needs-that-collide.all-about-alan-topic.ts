import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theNeedsThatCollide = {
  id: "01a0c598-679d-7712-9538-7bccf37f9715",
  type: "page-type/all-about-alan-topic",
  slug: "the-needs-that-collide",
  title: "The Needs That Collide",
  definition: "one ideal we both hold, and the two needs under it that cannot both be served",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/what-i-cannot-say-to-her",
    "all-about-alan-topic/being-understood",
  ],
  settled:
    "It is not our ideals that clash. We both hold the same one, that our needs be met. What collides is the needs.\n\nI need to be understood and accepted. She needs to feel stable and loved.\n\nMy changed understanding of myself knocked both out at once. A partner part-way through a transformation is not stable by definition, and the change reaches how my love is built, so being loved wobbles too.\n\nIt did not quiet my own need either. It made a new self the old acceptance does not cover, and then closed the only route to getting that self accepted.\n\nThere is a thread of hope in her resistance being defence rather than a verdict. Defence is not fixed. If I learn to meet her needs well enough, the resistance may come down, and that is the one lever that moves the board.",
} as const satisfies AllAboutAlanTopic
