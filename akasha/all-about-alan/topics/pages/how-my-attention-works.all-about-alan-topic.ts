import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howMyAttentionWorks = {
  id: "01a06559-9d65-76e3-b4bb-e0a9f1071107",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-my-attention-works",
  title: "How My Attention Works",
  definition: "where my attention goes, what holds it, and what it does when I leave it alone",
  parentSlugs: ["alan"],
  unsettled:
    "Interest gates how long I can hold attention, sharply enough that my college grades inverted against how hard the course was. Whether that asymmetry is a mechanism of its own, apart from each executive function and from interest itself, waits on more cases with outcomes attached.",
} as const satisfies AllAboutAlanTopic
