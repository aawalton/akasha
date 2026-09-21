import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatWeDidNotDoBeforeMarrying = {
  id: "01a0c5a4-f795-70ce-af13-b1bd3938adf9",
  type: "page-type/all-about-alan-topic",
  slug: "what-we-did-not-do-before-marrying",
  title: "What We Did Not Do Before Marrying",
  definition: "the standards for physical touch Jen and I held before the wedding",
  parents: ["all-about-alan-topic/how-i-got-to-jen"],
  related: ["all-about-alan-topic/what-sex-with-jen-is-like"],
  settled:
    "Our standards for physical touch were very strict.\n\nWe held hands early, near when we first started dating. We did not kiss until we were engaged, and even that was a chaste kiss. We did not go further than cuddling until after we were married.",
} as const satisfies AllAboutAlanTopic
