import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const recoveryCostsWhatItRestores = {
  id: "01a06559-9d65-7924-a871-2f24d500a88a",
  type: "all-about-alan-topic",
  slug: "recovery-costs-what-it-restores",
  title: "Recovery Costs What It Restores",
  definition: "what recovering from something costs me",
  parents: ["all-about-alan-topic/resources"],
  settled:
    "The moves that rebuild a resource also spend it, so being low can put them out of reach.",
} as const satisfies AllAboutAlanTopic
