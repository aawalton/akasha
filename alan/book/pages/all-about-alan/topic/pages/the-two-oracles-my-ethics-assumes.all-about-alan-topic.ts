import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theTwoOraclesMyEthicsAssumes = {
  id: "01a0c5a0-2a3c-7457-b170-ee06d1d21fb8",
  type: "page-type/all-about-alan-topic",
  slug: "the-two-oracles-my-ethics-assumes",
  title: "The Two Oracles My Ethics Assumes",
  definition: "perfect measurement of value and perfect attribution of causal credit",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  related: ["all-about-alan-topic/the-three-quantities-my-ethics-counts"],
  settled:
    "The central move is to hand an idealised agent perfect knowledge and then ask what ethics follows. That takes out the two objections doing most of the work against utilitarianism: that we cannot predict consequences, and that we judge states rather than agents.\n\nThe first oracle measures the probability-weighted value of every possible state of the world perfectly. State value is never negative, and it includes the probability-weighted value of all potential future life.\n\nThe second computes, from multiversal simulation data, each agent's exact contribution to any change in that value. That solves attribution, so the framework can assign credit and responsibility to agents rather than only grade states.\n\nThe attribution is the unique one with four properties I lean on throughout: shares sum exactly to the total, two agents contributing identically get the same, an agent who adds nothing anywhere gets zero, and credit decomposes and recomposes freely across sub-games.",
} as const satisfies AllAboutAlanTopic
