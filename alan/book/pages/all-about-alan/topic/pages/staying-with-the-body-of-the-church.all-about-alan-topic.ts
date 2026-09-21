import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const stayingWithTheBodyOfTheChurch = {
  id: "01a0c5ed-8d31-7ac6-92e3-3d82c384a0bd",
  type: "page-type/all-about-alan-topic",
  slug: "staying-with-the-body-of-the-church",
  title: "Staying With The Body Of The Church",
  definition: "the belief that the church is never wrong in the big things, and what it rests on",
  parents: ["all-about-alan-topic/my-faith"],
  related: [
    "all-about-alan-topic/testing-the-thing-at-my-centre",
    "all-about-alan-topic/why-i-hold-the-book-true",
  ],
  settled:
    "I stay with the body of the church. Not because it is never wrong. It can be wrong in the small things, and will never be wrong in the big things.\n\nOn its face that reads like a grant of authority, the one thing my instrument is built to be suspicious of. It is not. It is an implied belief if the foundational belief is true, not a foundation of its own, and it has no footing but what it inherits.\n\nIt runs as a live disposition: the body will not go astray on the big things, so any mistake is small, small mistakes are tolerable, so I need not concern myself with them. An error I observe is sorted into the small bin by construction.\n\nSo the whole load rests on the line between big and small, and that line is not drawn.\n\nThe foundation is one axiom: whether the Book of Mormon is what it claims to be. Everything else is deduced off it, and the loyalty heuristic is falsifiable only there. It cannot shield the foundation, because it has no separate footing at all.",
} as const satisfies AllAboutAlanTopic
