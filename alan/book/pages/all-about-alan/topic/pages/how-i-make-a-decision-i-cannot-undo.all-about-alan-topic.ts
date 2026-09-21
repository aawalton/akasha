import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIMakeADecisionICannotUndo = {
  id: "01a06559-9d65-74bf-8edc-41ce72c7375d",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-make-a-decision-i-cannot-undo",
  title: "How I Make A Decision I Cannot Undo",
  definition: "building a rubric to stand in for the future I cannot pre-play",
  parents: ["all-about-alan-topic/how-i-decide"],
  related: [
    "all-about-alan-topic/what-i-cannot-play-forward",
    "all-about-alan-topic/how-i-know-things",
  ],
  settled:
    "A decision I can undo I simply make, and let the world tell me. The world is my forward model. What picks the mode is how expensive reversing it would be.\n\nOne I cannot undo gets a rubric: name every factor I think matters, score the real candidates, iterate until it all fits.\n\nIt has to fit two ways at once. The scores have to hold up against each other across every case, and the whole thing has to match my preferences as far as I can make them out.\n\nThe rubric takes the place of the pre-play I cannot run. Touring a house with Jen reads a preference I cannot introspect.\n\nWalking through it gives me data, sometimes on a dimension I had not thought of. It is not a verdict.\n\nWhere my whole read and the rubric disagree, the more compact account wins.",
} as const satisfies AllAboutAlanTopic
