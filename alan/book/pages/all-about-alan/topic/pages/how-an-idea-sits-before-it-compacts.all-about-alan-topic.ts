import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howAnIdeaSitsBeforeItCompacts = {
  id: "01a0c5a8-eeca-7623-8a26-c3b052e47a63",
  type: "page-type/all-about-alan-topic",
  slug: "how-an-idea-sits-before-it-compacts",
  title: "How An Idea Sits Before It Compacts",
  definition: "a cloud of encodings held as a rough distribution until clarity arrives",
  parents: ["all-about-alan-topic/why-a-true-model-is-smaller"],
  related: ["all-about-alan-topic/how-i-remember-anything"],
  settled:
    "Before an idea compacts it is not nothing. It is held as a fuzzy generalisation, better described as a generalised probability distribution, and I keep collecting data points until the clarity arrives that makes them compact to some degree.\n\nWhat is held is not the raw data points. I cannot keep particulars. What is held is their encodings, so the distribution is a cloud of related hashes rather than a set of remembered observations.\n\nWhen a candidate structure arrives I have a sense of whether the hashes are consistent with it. The ones that do not fit become more salient.\n\nThe candidate is the thing the cloud gets tested against, and the misfit between the two is what drives the next move.",
} as const satisfies AllAboutAlanTopic
