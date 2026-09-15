import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howSomethingJoinsTheRotation = {
  id: "01a06559-9d65-7ea0-8daf-d949b0727fb6",
  type: "page-type/all-about-alan-topic",
  slug: "how-something-joins-the-rotation",
  title: "How Something Joins The Rotation",
  definition: "what gets into the set I am working through, and what leaves it",
  parents: ["all-about-alan-topic/small-bites-of-many-things"],
} as const satisfies AllAboutAlanTopic
