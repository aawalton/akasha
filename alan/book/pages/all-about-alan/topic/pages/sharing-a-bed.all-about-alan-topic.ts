import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const sharingABed = {
  id: "01a06559-9d65-795e-a0a9-e70e904f218d",
  type: "page-type/all-about-alan-topic",
  slug: "sharing-a-bed",
  title: "Sharing A Bed",
  definition: "sleeping next to Jen, and what chasing sleep has cost that",
  parents: ["all-about-alan-topic/sleep", "all-about-alan-topic/living-with-jen"],
  related: ["all-about-alan-topic/sex"],
  settled:
    "I moved out of the shared bedroom to get the sleep, and that split most nights into two places in two blocks.\n\nJen and I ran an experiment of me back in the bedroom under a rule that I slept nowhere else once the sun was down. That rule has gone. Now I sleep in the bedroom if I can afford to, which is safety two and above.\n\nIn a shared room I isolate my own sensory night: earbuds with white noise, the Nuropod, and a cooling eye mask.\n\nI almost always fall asleep two to four hours before Jen does.",
} as const satisfies AllAboutAlanTopic
