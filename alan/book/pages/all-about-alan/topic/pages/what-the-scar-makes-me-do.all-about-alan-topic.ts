import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatTheScarMakesMeDo = {
  id: "01a0c5a7-99e2-79bb-8c16-e9b5606a7cc7",
  type: "page-type/all-about-alan-topic",
  slug: "what-the-scar-makes-me-do",
  title: "What The Scar Makes Me Do",
  definition: "the behaviours it produces, sorted into two families",
  parents: ["all-about-alan-topic/why-making-things-hurts"],
  related: [
    "all-about-alan-topic/the-open-register",
    "all-about-alan-topic/rules-instead-of-a-brake",
  ],
  settled:
    "I avoid open creative play. Either I do not make at all, or I abort at the setup edge where the alarm peaks.\n\nI can do these things as work but not as play. The half that got amputated is the open one, done for its own sake.\n\nI cannot share what I make. Whole domains went outright: art, writing, singing alone.\n\nThe rule I keep for it is that if I cannot afford criticism, I cannot afford sharing creations.\n\nThe response no longer waits for judgement. It fires on the act of making, with no audience and no prediction that one is coming.\n\nThe behaviours sort into two families. Avoidance is not making, aborting at the setup edge, taking something structured or passive over open creation. Armour is creating only in judgement-proof forms: verifiable output, things built for myself and never shared, the making rerouted into quilts and code and ideas.\n\nHarsh was never the condition. Gentle but inescapable welds just as well.",
} as const satisfies AllAboutAlanTopic
