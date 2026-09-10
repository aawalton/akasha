import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whatAnActivityCostsMe = {
  id: "01a06559-9d65-74b7-8285-535889f4f996",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-an-activity-costs-me",
  title: "What An Activity Costs Me",
  definition: "what doing a particular thing takes out of me",
  parents: ["health-bar"],
  related: ["what-the-pod-does-to-the-price"],
  settled:
    "The price is set by how far above my safety level the thing sits.\n\nAn hour one rung above my safety level costs me two capacity hours, so I start paying a cost where I normally would not.",
} as const satisfies AllAboutAlanTopic
