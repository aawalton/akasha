import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theYearsWithMyParents = {
  id: "01a06559-9d65-7672-88c8-b2eb82240145",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-years-with-my-parents",
  title: "The Years With My Parents",
  definition:
    "my father's last years and my mother's, and the whole run of it that is nowhere written down",
  parentSlugs: ["the-chapters-of-my-life"],
  relatedSlugs: ["what-the-book-of-me-is-for", "why-getting-close-hurts"],
  unsettled:
    "My father's decline and death, the eighteen months of caring for him, and the eight years my mother lived with us are nowhere in the corpus.\n\nThe trusteeship and the ten years of unfiled trust taxes, the estrangement from my mother, and what she asked me about Medicaid, are unwritten too.\n\nThis surfaced at a low state, so what gets opened and when is my call rather than anyone else's.",
} as const satisfies AllAboutAlanTopic
