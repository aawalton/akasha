import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyAnAnomalyWritesHigh = {
  id: "01a0c59c-958d-7726-b13c-270e47baa3e7",
  type: "page-type/all-about-alan-topic",
  slug: "why-an-anomaly-writes-high",
  title: "Why An Anomaly Writes High",
  definition: "the one-off thing my model cannot account for being kept rather than dropped",
  parents: ["all-about-alan-topic/what-gets-written-into-my-model"],
  related: ["all-about-alan-topic/how-understanding-arrives"],
  settled:
    "A one-off thing usually writes low, and an anomaly is the exception.\n\nAn anomaly I cannot account for is its own placeholder. Until my model grows to take it in, the memory of it is the only account of it there is, so it scores high on the strongest of the four.\n\nIt carries a debt, and it is kept precisely because the debt is unpaid. The model has to hold it because it cannot yet absorb it.\n\nCompressing the ones I am holding is what drives the model to a better fit.",
} as const satisfies AllAboutAlanTopic
