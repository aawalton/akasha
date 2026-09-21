import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatAnActivityCostsMe = {
  id: "01a06559-9d65-74b7-8285-535889f4f996",
  type: "page-type/all-about-alan-topic",
  slug: "what-an-activity-costs-me",
  title: "What An Activity Costs Me",
  definition: "what doing a particular thing takes out of me",
  parents: ["all-about-alan-topic/health-bar"],
  related: ["all-about-alan-topic/what-the-pod-does-to-the-price"],
  settled:
    "The price is set by how far above my safety level the thing sits.\n\nAn hour one rung above my safety level costs me two capacity hours, so I start paying a cost where I normally would not.\n\nA rung above the thing, the multiplier is nought and the thing costs nothing at all. At the thing's own rung it is one times. Below that it climbs through one and a half, two and three.\n\nUnder my own rung the thing drains faster than I can absorb. Doing it anyway does damage, and the damage has to be paid back out of something else.",
} as const satisfies AllAboutAlanTopic
