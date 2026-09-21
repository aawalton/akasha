import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoZeroTolerances = {
  id: "01a0c59e-cb27-747d-8d74-8894cefdb7cb",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-zero-tolerances",
  title: "The Two Zero Tolerances",
  definition: "the church and Jen both allowing none of it, and what that seals in",
  parents: ["all-about-alan-topic/sex"],
  related: [
    "all-about-alan-topic/the-subject-i-kept-sealed",
    "all-about-alan-topic/whether-the-rule-survives",
  ],
  settled:
    "My religion as organised has effectively zero tolerance for the behaviour itself. Jen is very mainstream, so she has zero tolerance too.\n\nZero tolerance on both sides has one structural consequence. It makes the entire aspect of my life secret and hidden, which is not great. There is no side I can set it down with, not the church and not the marriage.\n\nThe secrecy is its own cost, separate from the behaviour. A whole region of me is sealed because both the person and the institution that would have to hold it will not.",
} as const satisfies AllAboutAlanTopic
