import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatAHotBathActuallyDoes = {
  id: "01a0c5a8-b686-7fe3-beaa-bc085bfeaac6",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-hot-bath-actually-does",
  title: "What A Hot Bath Actually Does",
  definition: "the shift the heat produces, against the mechanism I first believed",
  parents: ["all-about-alan-topic/the-hot-bath"],
  related: ["all-about-alan-topic/how-i-actually-breathe"],
  settled:
    "An hour in the bath pays back about three capacity hours.\n\nI worked out by experiment that the bath lowers my stress, and that exercise hard enough to sweat does the same thing in the same shape. From that I concluded I was sweating the cortisol out. The observation was right and the mechanism was wrong.\n\nAlmost no cortisol leaves through sweat. It clears through the liver and the kidneys. Sweat is a marker of what is in the blood rather than a way out of the body.\n\nWhat the heat does is shift me from sympathetic toward parasympathetic, and over weeks of repeated exposure it resets the baseline of the whole stress system. Acute heat raises cortisol briefly before that longer recalibration takes hold.\n\nSlow breathing works on the same thing, which is why it stacks with the bath rather than doing something separate.",
} as const satisfies AllAboutAlanTopic
