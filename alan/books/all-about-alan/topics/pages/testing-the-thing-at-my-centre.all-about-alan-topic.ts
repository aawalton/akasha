import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const testingTheThingAtMyCentre = {
  id: "01a06559-9d65-7865-8115-ce4a2895f662",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "testing-the-thing-at-my-centre",
  title: "Testing The Thing At My Centre",
  definition: "re-examining the belief everything else of mine rests on",
  parents: ["my-faith"],
  related: ["why-i-hold-the-book-true", "what-i-think-truth-is"],
  settled:
    "It was poured into me before there was anyone here to inspect it, and the rest of me rests on it.\n\nThat makes it the biggest lever I have and the most dangerous place to push.\n\nI dug to these foundations once at university. What is different now is the instrument, not the question.\n\nAs a child my test was that an authority said so. The instrument I have now gives that no weight.\n\nMy instinct strips out every spare factor, and this is the least minimal account there is. The evidence buys it.",
} as const satisfies AllAboutAlanTopic
