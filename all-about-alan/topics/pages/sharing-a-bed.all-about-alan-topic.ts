import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const sharingABed = {
  id: "01a06559-9d65-795e-a0a9-e70e904f218d",
  pageTypeSlug: "all-about-alan-topic",
  slug: "sharing-a-bed",
  title: "Sharing A Bed",
  definition: "sleeping next to Jen, and what chasing sleep has cost that",
  parentSlugs: ["sleep", "living-with-jen"],
  relatedSlugs: ["sex"],
  settled:
    "I moved out of the shared bedroom to get the sleep, and that split most nights into two places in two blocks.\n\nJen and I are running an experiment of me back in the bedroom, under a rule that if the sun is down I do not sleep anywhere else.\n\nIn a shared room I isolate my own sensory night: earbuds with white noise, the Nuropod, and a cooling eye mask.\n\nI almost always fall asleep two to four hours before Jen does.",
  unsettled:
    "Whether Jen wants weight on the bed too, or whether the bed can carry it on one side only, decides whether the weighted blanket can fire at all.\n\nWhether the cuddle at the handoff, parked because setting it up is a level-five conversation, is dropped or only overtaken is unsettled.\n\nWhether the sensory stack is what made the bedroom survivable, rather than only accompanying it, is unestablished.",
} as const satisfies AllAboutAlanTopic
