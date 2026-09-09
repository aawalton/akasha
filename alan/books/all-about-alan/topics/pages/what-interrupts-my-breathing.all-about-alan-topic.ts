import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatInterruptsMyBreathing = {
  id: "01a06559-9d65-719d-a284-b4d9519e2b51",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-interrupts-my-breathing",
  title: "What Interrupts My Breathing",
  definition: "what stops the breathing practice running",
  parents: ["what-calms-me-down"],
  settled:
    "Anything that needs my mouth or my chest pauses it. Talking, eating and weight on the chest are the worked cases.",
} as const satisfies AllAboutAlanTopic
