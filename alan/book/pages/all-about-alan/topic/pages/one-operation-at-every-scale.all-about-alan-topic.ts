import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const oneOperationAtEveryScale = {
  id: "01a0c5a8-89b3-77bf-af1e-79bf90cb8cc5",
  type: "page-type/all-about-alan-topic",
  slug: "one-operation-at-every-scale",
  title: "One Operation At Every Scale",
  definition: "insight, paradigm shift, learning from pain and my rubric as one move at four sizes",
  parents: ["all-about-alan-topic/why-a-true-model-is-smaller"],
  related: [
    "all-about-alan-topic/how-understanding-arrives",
    "all-about-alan-topic/how-i-make-a-decision-i-cannot-undo",
  ],
  settled:
    "Insight, the big shifts, learning from pain and my decision rubric are not four processes. They are one operation seen at four sizes: find the smallest representation that accounts for the data.\n\nAn insight is the micro event, one local graph compressing.\n\nA shift of paradigm is the macro event, a whole domain's model replaced by a more compact one.\n\nA failed prediction is data the current model cannot compress, and the residue piling up is what forces the collapse into a better one.\n\nInterest keeps renewing because each step affords more compression, so the investment keeps paying.\n\nThe rubric is forcing a compression on purpose, and where the rubric and my whole read disagree the more compact account wins.",
} as const satisfies AllAboutAlanTopic
