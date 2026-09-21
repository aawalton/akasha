import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theSubjectIKeptSealed = {
  id: "01a0c58d-5871-7313-ba4e-70f2f855a625",
  type: "page-type/all-about-alan-topic",
  slug: "the-subject-i-kept-sealed",
  title: "The Subject I Kept Sealed",
  definition: "the one subject I kept shut my whole life, and what opening it changed",
  parents: ["all-about-alan-topic/sex"],
  related: [
    "all-about-alan-topic/being-known",
    "all-about-alan-topic/what-it-costs-someone-to-know-me",
    "all-about-alan-topic/the-part-i-have-not-opened",
  ],
  settled:
    "For my whole life this was the one subject I kept shut. It was on record only at its edge, as a thing I could not disclose, with the contents never given to anyone.\n\nBeing known needs disclosure, and disclosure here never felt available, so no channel ever reached it. That is a second kind of not being known: a subject I cannot be known about, rather than a person who cannot know me.\n\nI opened it myself. The seal lifted from my side, head-on, and the whole of it went to another person for the first time.",
} as const satisfies AllAboutAlanTopic
