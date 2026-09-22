import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatARecurringPainIsWorthToMe = {
  id: "01a0c94e-64f5-771e-8a4f-fd6501962bed",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-recurring-pain-is-worth-to-me",
  title: "What A Recurring Pain Is Worth To Me",
  definition: "why my threshold for inventing against a pain is so low",
  parents: ["all-about-alan-topic/being-an-inventor-not-a-coder"],
  related: [
    "all-about-alan-topic/the-floor-that-rises",
    "all-about-alan-topic/why-nothing-goes-stale-on-me",
  ],
  settled:
    "Not much has to be true before a pain is worth inventing against.\n\nI do not habituate to pain, so any source of recurring pain continues to cost.\n\nSo I put a high value on preventing sources of recurring pain, which means I am willing to do things in those efforts that other people would never consider.\n\nI spend eighty hours a week building AI tooling and products to solve pain points in my own life.",
} as const satisfies AllAboutAlanTopic
