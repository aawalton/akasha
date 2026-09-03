import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatAnActivityCostsMe = {
  id: "01a06559-9d65-74b7-8285-535889f4f996",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-an-activity-costs-me",
  title: "What An Activity Costs Me",
  definition: "what doing a particular thing takes out of me",
  parentSlugs: ["health-bar"],
  relatedSlugs: ["what-the-pod-does-to-the-price"],
  settled:
    "The price is set by how far above my safety level the thing sits.\n\nAn hour one rung above my safety level costs me two capacity hours, so I start paying a cost where I normally would not.",
  unsettled:
    "The estimate of doubling per safety level is now anchored at the hard end and one rung up, at difficulty three against a safety level of two. Whether it doubles the same way for easy things is still open. Programming stayed affordable through deep burnout, which points at less amplification down there.\n\nTalking costs me twice, once in the work of keeping up and once in the recovery it pauses. Which of the two is the bigger half has never been split out.",
} as const satisfies AllAboutAlanTopic
