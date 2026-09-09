import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const sharingABed = {
  id: "01a06559-9d65-795e-a0a9-e70e904f218d",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "sharing-a-bed",
  title: "Sharing A Bed",
  definition: "sleeping next to Jen, and what chasing sleep has cost that",
  parents: ["sleep", "living-with-jen"],
  related: ["sex"],
  settled:
    "I moved out of the shared bedroom to get the sleep, and that split most nights into two places in two blocks.\n\nJen and I are running an experiment of me back in the bedroom, under a rule that if the sun is down I do not sleep anywhere else.\n\nIn a shared room I isolate my own sensory night: earbuds with white noise, the Nuropod, and a cooling eye mask.\n\nI almost always fall asleep two to four hours before Jen does.",
} as const satisfies AllAboutAlanTopic
