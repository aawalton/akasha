import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theAnswerThatShowedTheGap = {
  id: "01a0c603-0d39-77af-87ab-58f2d0bad62d",
  type: "page-type/all-about-alan-topic",
  slug: "the-answer-that-showed-the-gap",
  title: "The Answer That Showed The Gap",
  definition: "what I said when asked to predict how she would take the map I am building of her",
  parents: ["all-about-alan-topic/working-out-how-she-thinks"],
  settled:
    "Asked how Jen would take being told I had built a model of her psychology, I said: maybe well? I cannot really simulate that.\n\nIt is worth keeping because it is the missing faculty firing on the question itself rather than a report about it. Asked for a prediction about a person, I gave a guess and then named the reason it could be no better than a guess.",
} as const satisfies AllAboutAlanTopic
