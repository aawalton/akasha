import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const howWarmIRun = {
  id: "01a06559-9d65-7ad9-b0ed-b14779ddf363",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "how-warm-i-run",
  title: "How Warm I Run",
  definition: "how hot or cold I am, which follows my safety level rather than the room",
  parents: ["resources"],
  related: ["how-stimulated-i-am"],
  settled:
    "The room stays where it is while I swing from shivering to sweating.\n\nHigh safety runs me hot and low safety runs me cold, so cold-leaning is a low-safety signature rather than a constant.\n\nThe sensing works. What fails is producing the heat, too little at the bottom and too much at the top.\n\nI am cold after eating whatever else is true.",
} as const satisfies AllAboutAlanTopic
