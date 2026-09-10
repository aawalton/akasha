import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theRatingMyBudgetRestsOn = {
  id: "01a07824-30b9-7011-884c-1d5498be5e6d",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-rating-my-budget-rests-on",
  title: "The Rating My Budget Rests On",
  definition: "the hand-set rating my surplus number is built on, and how I keep the rating true",
  parents: ["the-budget-i-run-my-days-on"],
  related: ["how-i-read-my-safety-level"],
  settled:
    "Only the clock is counted. Each stretch's duration is multiplied by how safe I was against how hard the thing was, and the safety rating is one I type and one that carries forward until I change it.\n\nAffordable means the multiplier is one or less, which is the same as my safety level sitting at or above the difficulty level. Better again is free, where my safety level is at least one above the difficulty and the stretch costs nothing.\n\nI try to catch the transitions as they happen. Where I miss one, I revise the safety or the difficulty afterwards.\n\nThe revision usually moves down, so my live reading runs optimistic. The optimistic reading is still better than nothing.\n\nI am working on catching the changes earlier and on erring low.\n\nA notification fires as my surplus color drops, and Jen gets the same alert. I do nothing when the alert lands. What the alert buys me for now is knowing where I am.",
} as const satisfies AllAboutAlanTopic
