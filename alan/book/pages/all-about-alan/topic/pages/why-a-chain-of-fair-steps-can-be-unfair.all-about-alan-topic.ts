import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAChainOfFairStepsCanBeUnfair = {
  id: "01a0c5a2-0ac9-786b-85c5-e4a910a841f5",
  type: "page-type/all-about-alan-topic",
  slug: "why-a-chain-of-fair-steps-can-be-unfair",
  title: "Why A Chain Of Fair Steps Can Be Unfair",
  definition: "each agent bound at the scale they authored, with no summing across nested games",
  parents: ["all-about-alan-topic/why-my-ethics-works-at-every-scale"],
  settled:
    "Each agent is bound at the scale of what they actually authored. The attribution already gives every agent a share of every object at every scale. Whoever carries out one decision has a large share of it and a negligible share of the regime; the architects have the reverse. Which verdict binds whom is read off the attribution rather than chosen.\n\nAttributions from different-scale games are never summed. Each game is its own closed accounting. A harm appearing in both a decision game and the enclosing regime game is not counted twice: in each it goes to a different set of authors.\n\nSo the worry about a chain of individually fair steps is a scale confusion, judging a large authored object by the verdicts on its small parts.\n\nAn architect who also personally carries out a decision is charged in both games, correctly, because they authored two distinct objects. The test is distinct authored objects rather than distinct scales, and where the two come apart, authorship decides.",
} as const satisfies AllAboutAlanTopic
