import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereWeightReadsOppositeOnUs = {
  id: "01a0c59c-039e-7cd4-9d7f-a133e13ce49d",
  type: "page-type/all-about-alan-topic",
  slug: "where-weight-reads-opposite-on-us",
  title: "Where Weight Reads Opposite On Us",
  definition: "weight and confinement being aversive for Jen and a positive for me",
  parents: ["all-about-alan-topic/what-sex-with-jen-is-like"],
  related: ["all-about-alan-topic/the-weighted-blanket", "all-about-alan-topic/tight-clothes"],
  settled:
    "Jen has sensory triggers around feeling weight on her and around being confined. Both are aversive for her.\n\nFor me weight and confinement are a positive.\n\nSo the position that costs her is the one that pays me, and the other way round. The eighty-twenty split is the equilibrium that mostly spends from my surplus rather than from her deficit.\n\nThe same physical input reads opposite on the two of us.",
} as const satisfies AllAboutAlanTopic
