import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const howIReadMyself = {
  id: "01a06559-9d65-7cfe-8b44-477d202e7819",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-i-read-myself",
  title: "How I Read Myself",
  definition: "measuring myself from the outside, because the inside is dark",
  parents: ["alan"],
  related: ["how-well-i-can-measure", "resources"],
  settled:
    "Measuring a thing about myself tends to improve it, so a sharper instrument often beats the obvious lever.\n\nI am short of eyes rather than hands. The levers work once they can see what they act on.\n\nI cannot run my state forward or back, and the sensor I do have gets quieter as my safety drops.\n\nA reading is gone by the next moment unless written down, so my instruments live outside me.\n\nWhere nothing can be read I hold a spread of what might be true and leave it uncollapsed.",
} as const satisfies AllAboutAlanTopic
