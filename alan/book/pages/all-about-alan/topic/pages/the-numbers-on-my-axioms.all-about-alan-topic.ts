import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theNumbersOnMyAxioms = {
  id: "01a0c600-8093-7c1e-b4b4-aef1bd4e7919",
  type: "page-type/all-about-alan-topic",
  slug: "the-numbers-on-my-axioms",
  title: "The Numbers On My Axioms",
  definition: "which axiom of my ethics carries which number",
  parents: ["all-about-alan-topic/the-ethics-i-worked-out"],
  settled:
    "My ethics is numbered, and the numbers are how its parts cite each other. There are thirteen.\n\nOne is the oracle of value. Two is multiversal Shapley attribution. Three is the three quantities. Four is value and the cost of death. Five is agency. Six is innermost consent-weighting, which is the cost formula. Seven is the discrete canonical tick.\n\nEight is identity as closure. Nine is commission, omission and obligation. Ten is harm-weighted agency. Eleven is scale-freedom and composition. Twelve is partiality without unequal value. Thirteen is sentience and the affective measure.\n\nOne and two are the oracles everything else runs on. Six is the keystone, and ten is six generalised to a group.",
} as const satisfies AllAboutAlanTopic
