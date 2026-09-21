import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theAlibiThatRarelyHolds = {
  id: "01a0c5a0-296f-7029-bda1-8ca9a18a2bd2",
  type: "page-type/all-about-alan-topic",
  slug: "the-alibi-that-rarely-holds",
  title: "The Alibi That Rarely Holds",
  definition: "what perfection actually buys, and why the acquittal seldom arrives",
  parents: ["all-about-alan-topic/turning-punishment-into-self-hatred"],
  related: [
    "all-about-alan-topic/why-i-have-to-be-perfect",
    "all-about-alan-topic/calling-something-weather",
  ],
  settled:
    "Safety was never what it buys. I am not safe even at the top: it can still be aimed at me, and it can still be a verdict in other people's eyes.\n\nWhat it buys is one joint. Having discharged everything that was mine to do, whatever still lands is truly unavoidable, and I can take some solace in not blaming myself for it.\n\nThat is the only part borrowed from calling a thing weather: the unavoidability. What cannot be changed is not mine to answer for. The punishment itself does not become weather.\n\nEffort is the one thing I am allowed to keep perfect. If this fails, it will not be because I could have done more.\n\nThe acquittal rarely lands. There is almost always one more thread I can imagine having pulled, so the bar slides and perfect sits just past where I got.\n\nWhich is the flaw in the whole thing. My only defence against hating myself is a standard I can almost never prove I met.",
} as const satisfies AllAboutAlanTopic
