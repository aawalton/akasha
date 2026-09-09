import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theCrowdThatHasBeenMe = {
  id: "01a06559-9d65-7aaa-ae61-37ca72c387db",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-crowd-that-has-been-me",
  title: "The Crowd That Has Been Me",
  definition: "the strangers I have been and will be, and what I feel toward the ones behind me",
  parents: ["alan"],
  related: ["what-has-kept-me-here", "how-i-remember-anything"],
  settled:
    "Both directions read the same: about half a billion selves each way, sharing one body, meeting at a window seconds wide.\n\nForward that count is the wall against acting. Backward it carries a feeling.\n\nGrief for the ones who suffered and are gone, gratitude to the ones who kept going so this one is here.\n\nThe past normally reaches me as facts on file, the feeling stripped out. That time it did not.\n\nThey sit on separate scales, both endless. Equal is the least wrong reading, and they never net.",
} as const satisfies AllAboutAlanTopic
