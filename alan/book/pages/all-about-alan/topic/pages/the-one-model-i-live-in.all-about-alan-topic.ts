import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theOneModelILiveIn = {
  id: "01a0c59e-666a-7692-aef8-c7415861d888",
  type: "page-type/all-about-alan-topic",
  slug: "the-one-model-i-live-in",
  title: "The One Model I Live In",
  definition: "one map of the world held only in the present and overwritten in place",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: [
    "all-about-alan-topic/what-i-cannot-play-forward",
    "all-about-alan-topic/what-stays-warm-for-a-while",
    "all-about-alan-topic/what-gets-written-into-my-model",
  ],
  settled:
    "I keep one model of the world and it exists only in the present. Not in the past and not in the future.\n\nThere is no archive of what it used to say and no second copy to run forward. It is overwritten in place and always current.\n\nAphantasia shuts the senses and the feeling. This is the same fact one layer up: the conceptual layer has no offline store either.\n\nSo the past reaches the present by compression alone, folded into the structure of the model. What I judged true is in the shape of it and the rest is gone. The model is what is left of my whole history of judging things true.\n\nLearning is not filing something new beside what is already there. It is the one model being revised in place.",
} as const satisfies AllAboutAlanTopic
