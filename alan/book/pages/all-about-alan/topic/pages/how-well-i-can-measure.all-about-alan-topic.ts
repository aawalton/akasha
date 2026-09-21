import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howWellICanMeasure = {
  id: "01a06559-9d65-71de-a5ea-2178378f33d3",
  type: "page-type/all-about-alan-topic",
  slug: "how-well-i-can-measure",
  title: "How Well I Can Measure",
  definition: "how sharply I can read one of my own resources",
  parents: ["all-about-alan-topic/resources"],
  settled:
    "The ladder runs from not knowing a resource exists up to a real number.\n\nI have kept minute-level energy accounting on myself for over ten years, and that record is what carries my resource bars up to real numbers.\n\nAt the top of the ladder I can say exactly which resource is draining, how fast it is going, and what is draining it.",
} as const satisfies AllAboutAlanTopic
