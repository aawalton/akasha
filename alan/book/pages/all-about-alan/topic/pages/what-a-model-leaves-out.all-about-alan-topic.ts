import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatAModelLeavesOut = {
  id: "01a04625-d80c-7458-99ee-30faa32f46f2",
  type: "page-type/all-about-alan-topic",
  slug: "what-a-model-leaves-out",
  title: "What A Model Leaves Out",
  definition: "what every model costs to be usable, and where I think the value actually sits",
  parents: ["all-about-alan-topic/how-i-know-things"],
  related: ["all-about-alan-topic/what-i-think-truth-is"],
  settled:
    "All models are false, because they simplify out nuance for intelligibility.\n\nI find the nuance is where the gold is.",
} as const satisfies AllAboutAlanTopic
