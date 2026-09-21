import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatHoldsMyMarriage = {
  id: "01a06559-9d65-71ea-aeea-b27cc873759d",
  type: "page-type/all-about-alan-topic",
  slug: "what-holds-my-marriage",
  title: "What Holds My Marriage",
  definition: "commitment rather than attachment, and what standing on that costs both of us",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/keeping-my-word",
    "all-about-alan-topic/why-i-have-to-be-perfect",
    "all-about-alan-topic/working-out-what-love-is",
  ],
  settled:
    "I do not believe I have the ability to form emotional attachments at all, due to the aphantasia. Attachment is built on stored warmth and imagining forward, neither of which I have.\n\nInstead I have commitment, which I internalised at an extremely deep level as an effort to make myself safer in a world that frequently turns against me for reasons I cannot understand. I have been acting for almost twenty years out of commitment, not attachment.\n\nCommitment is the heavier should. Caring about Jen runs on the same evaluator as any task, raised above it by the weight the commitment adds. No feeling is implied.\n\nPerfection is the unbreakable standard and commitment the unbreakable bond, from one fire.\n\nI committed by following the good-person script: do well in school, serve a mission, get married, support a family. I did not understand myself well enough then to have chosen a fixed point deliberately.\n\nFrom outside it is the whole signature of attachment, and I cannot see it from in here.",
} as const satisfies AllAboutAlanTopic
