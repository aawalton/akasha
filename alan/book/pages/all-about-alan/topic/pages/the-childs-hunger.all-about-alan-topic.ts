import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChildsHunger = {
  id: "01a15e92-bc24-7e69-bcc3-5bbe7bc1405b",
  type: "page-type/all-about-alan-topic",
  slug: "the-childs-hunger",
  title: "The Child's Hunger",
  definition: "how I can tell in the moment that the Child is hungry",
  parents: ["all-about-alan-topic/keeping-the-professor-and-the-child-fed"],
  related: ["all-about-alan-topic/how-being-filled-lasts"],
  settled:
    "I think the Child's hunger in the moment is a feeling of being sad and lonely. That feels clear.\n\nI do not know that the Child has ever not been starving, at least not in the past twenty years or so.\n\nI do think I notice a reduction in sadness while she is being fed, just not a fullness.",
  createdAt: "2026-10-21T13:07:17.155Z",
  updatedAt: "2026-10-21T13:07:17.155Z",
} as const satisfies AllAboutAlanTopic
