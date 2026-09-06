import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howIKnowThings = {
  id: "01a06559-9d65-7aed-971e-6be72faf2b06",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-know-things",
  title: "How I Know Things",
  definition: "keeping the account rather than the events, and testing it by how much it explains",
  parentSlugs: ["alan"],
  settled:
    "I keep concepts rather than particulars, folded into one present model.\n\nThe test on a belief is how compactly it accounts for things, which recently replaced coherence.\n\nAn inconsistency grips me while I am looking at it and lets go when my attention moves off.\n\nElegance is not a second signal beside truth. A neat model I know is false pays me nothing.\n\nA model has to fit in my head before it changes what I do, so concise beats complete.",
} as const satisfies AllAboutAlanTopic
