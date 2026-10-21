import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChildsGender = {
  id: "01a15e86-84aa-7a09-8f46-0d7f53eec107",
  type: "page-type/all-about-alan-topic",
  slug: "the-childs-gender",
  title: "The Child's Gender",
  definition: "whether the Child and the Professor are each a her or a him inside me",
  parents: ["all-about-alan-topic/the-professor-and-the-child"],
  related: ["all-about-alan-topic/where-i-land-on-gender"],
  settled:
    "I think the Child might be a her internally, not a him. That might explain part of why gender identity is always so confusing for me.\n\nThe Professor is definitely a him.",
  createdAt: "2026-10-21T12:53:56.521Z",
  updatedAt: "2026-10-21T12:53:56.521Z",
} as const satisfies AllAboutAlanTopic
