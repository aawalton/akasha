import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theObjectionsMyEthicsTracks = {
  id: "01a0c600-f4d1-7b63-835d-28c0a5707eb4",
  type: "page-type/all-about-alan-topic",
  slug: "the-objections-my-ethics-tracks",
  title: "The Objections My Ethics Tracks",
  definition: "the fourteen standing objections to utilitarianism and what answers each",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  related: ["all-about-alan-topic/the-numbers-on-my-axioms"],
  settled:
    "The framework keeps a tracker of the standing objections, fourteen of them, and names what answers each.\n\nNot being able to predict consequences goes to the oracle. Judging states rather than agents goes to Shapley attribution. Comparing utility between people goes to the three quantities. The separateness of persons and involuntary sacrifice go to the fourth through the sixth. The single suffering child goes to innermost weighting.\n\nPopulation ethics goes to a bounded total view. Engineered preferences go to judging the act rather than the state. Demandingness, and omission and negligence, both go to obligation as cost-to-act against shared harm prevented. Acts against intent goes to intent carrying no weight of its own.\n\nMinority protection goes to harm-weighted agency. The utility monster goes to the affective weight. Scale confusion goes to scale-freedom. Partiality goes to the twelfth.",
} as const satisfies AllAboutAlanTopic
