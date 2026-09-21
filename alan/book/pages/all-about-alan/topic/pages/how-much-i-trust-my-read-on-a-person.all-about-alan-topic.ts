import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howMuchITrustMyReadOnAPerson = {
  id: "01a0c595-b339-75e9-b8c6-02acd539b8c0",
  type: "page-type/all-about-alan-topic",
  slug: "how-much-i-trust-my-read-on-a-person",
  title: "How Much I Trust My Read On A Person",
  definition: "a model whose own unreliability is the beam holding it up",
  parents: ["all-about-alan-topic/how-i-model-other-people"],
  related: ["all-about-alan-topic/how-different-i-actually-am"],
  settled:
    "My model of other people carries the deep unreliability of my models of other people inside it. It has to, to account for the data: the predictions keep failing, and the cheapest way to hold that is to write the unreliability in as a beam rather than bolt a discount on the outside.\n\nSo what I am confident about is how little the model knows.\n\nSet against the way most people do it, that is not a clean win. Most people read most people better than I do, and read me worse than most others are read.\n\nMine is the more honest instrument, because it cannot assume its way into somebody's interior. I am overconfident too, and that is more than counterbalanced by forgetting how different other people are and underestimating how different I am.",
} as const satisfies AllAboutAlanTopic
