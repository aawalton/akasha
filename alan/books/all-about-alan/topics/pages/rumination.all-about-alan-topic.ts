import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const rumination = {
  id: "01a06559-9d65-7601-b282-99807b135266",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "rumination",
  title: "Rumination",
  definition: "a thought my mind grabs and grinds when I go to sleep stressed",
  parents: ["how-my-attention-works"],
  settled:
    "Stress starts it, not an idle mind. The worry is the stress finding a face to wear.\n\nIt grinds only where the thought is important, unsolved and open. Anything else rides along and fades.\n\nIt is conscious focus, so it holds me awake, and the grip releases the moment my attention moves off it.\n\nA low-grade anchor crowds it out. Doing nothing does not.",
} as const satisfies AllAboutAlanTopic
