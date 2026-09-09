import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const holdingAResponsibility = {
  id: "01a06559-9d65-77a5-86c7-f2383c80123c",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "holding-a-responsibility",
  title: "Holding A Responsibility",
  definition: "what an owed thing does to me while I am holding it, and what actually lets go",
  parents: ["what-i-let-myself-take-on"],
  related: ["playing-again", "how-i-get-anything-done"],
  settled:
    "It flattens everything until it clears, and nothing under it can be enjoyed for itself.\n\nFinishing is not what frees me. What does is having no step I could take right now, with the thing far from done.\n\nI can only rest past the gate: in the foyer I could still be at security.\n\nThree ways out: take the step, park it somewhere I trust to raise it again, or decide it is not mine.\n\nA thing that never runs out of steps never lets go. A company was the worst case, a special kind of hell.",
} as const satisfies AllAboutAlanTopic
