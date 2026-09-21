import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whenICannotPredictSomeone = {
  id: "01a0c5a0-4328-7320-9218-9aee44b89350",
  type: "page-type/all-about-alan-topic",
  slug: "when-i-cannot-predict-someone",
  title: "When I Cannot Predict Someone",
  definition: "the estimator that scores my own inability to model a person as danger",
  parents: ["all-about-alan-topic/how-i-read-whether-someone-is-safe"],
  related: [
    "all-about-alan-topic/why-people-read-as-unsafe",
    "all-about-alan-topic/what-my-body-reads-off-a-body",
  ],
  settled:
    "The third estimator does not read a threat at all. It reads my own inability to predict.\n\nA mismatch between someone's physiology and their gender identity is a threat signal to me, and not because of anything in the content of the mismatch. It is that I cannot predict or understand how they will behave. The variance itself scores as danger.\n\nSo my score drops by two different routes. Either the physiology estimator returns a confident prediction and the prediction points somewhere bad, or there is no confident prediction to be had. One is a bad answer and the other is no answer.\n\nThis is the childhood setting showing through unchanged. People punish what they do not understand. I was the illegible one who got punished, and now, reading someone else, what I cannot model is what I fear.",
} as const satisfies AllAboutAlanTopic
