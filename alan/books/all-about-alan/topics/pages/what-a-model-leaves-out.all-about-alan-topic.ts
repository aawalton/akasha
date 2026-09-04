import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatAModelLeavesOut = {
  id: "01a04625-d80c-7458-99ee-30faa32f46f2",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-a-model-leaves-out",
  title: "What A Model Leaves Out",
  definition: "what every model costs to be usable, and where I think the value actually sits",
  parentSlugs: ["how-i-know-things"],
  relatedSlugs: ["what-i-think-truth-is"],
  settled:
    "All models are false, because they simplify out nuance for intelligibility.\n\nI find the nuance is where the gold is.",
  unsettled:
    "This sits against my own test that a model has to fit in my head before it changes what I do, so concise beats complete. Which way I go when the nuance will not fit is unsettled.\n\nAbby's reading: this is why every topic in this book carries a Questions section. The section is where the nuance a definition simplified out gets kept instead of thrown away.\n\nWhether some nuance is worth losing, and what tells me which, is unprobed.",
} as const satisfies AllAboutAlanTopic
