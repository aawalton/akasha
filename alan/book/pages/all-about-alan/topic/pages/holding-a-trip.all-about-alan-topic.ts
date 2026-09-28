import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const holdingATrip = {
  id: "01a0e97e-0967-7563-b9a5-7c2029393895",
  type: "page-type/all-about-alan-topic",
  slug: "holding-a-trip",
  title: "Holding A Trip",
  definition: "a trip as a chain of responsibilities that holds me until I am past its gate",
  parents: ["all-about-alan-topic/holding-a-responsibility"],
  related: [
    "all-about-alan-topic/the-low-feeling-that-costs-me-a-level",
    "all-about-alan-topic/what-every-trip-has-cost-me",
  ],
  settled:
    "A trip is a chain of responsibilities rather than one. The next link is always in front of me until I am on the plane, so the gate for a trip is that trip's own gate.\n\nThe next step is time based, and with no sense of time I do not trust myself to catch it until it is done.\n\nSo packing does not switch me into done mode. On 28 September 2026, the day before a trip, finishing the packing would not have done it.\n\nA departure is not parked. I defer or finesse it until it gets closer.\n\nI think I feel the weight of the whole trip, not just the next step. That day I knew I would have reduced autonomy for the next ten days.",
} as const satisfies AllAboutAlanTopic
