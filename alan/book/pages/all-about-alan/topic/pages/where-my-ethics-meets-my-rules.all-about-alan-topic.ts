import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whereMyEthicsMeetsMyRules = {
  id: "01a06559-9d65-7bea-aa89-c6d0e7bae0dd",
  type: "page-type/all-about-alan-topic",
  slug: "where-my-ethics-meets-my-rules",
  title: "Where My Ethics Meets My Rules",
  definition: "the seams between the framework and the bright lines I actually run on",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  related: ["all-about-alan-topic/what-i-let-myself-take-on"],
  settled:
    "The framework prices harm to me and weighs it. My own rule forbids it outright.\n\nAbove the floor the pressure runs the other way, and I put it at full strength: if I can make choices in the present that are neutral or positive for present me and are strongly positive for future me, I would view it as highly unethical not to.\n\nSo the rule is a floor with a duty over it rather than a single direction. Below, nothing trades. Above, declining the free future gain is itself the wrong.\n\nBoth my ethics and my sense of self landed on identity as closure over a branching structure, arrived at separately.",
} as const satisfies AllAboutAlanTopic
