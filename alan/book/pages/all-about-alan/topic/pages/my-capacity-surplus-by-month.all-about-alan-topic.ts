import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const myCapacitySurplusByMonth = {
  id: "01a1972b-44cc-78a2-832d-5aa50ccf991e",
  type: "page-type/all-about-alan-topic",
  slug: "my-capacity-surplus-by-month",
  title: "My Capacity Surplus By Month",
  definition: "the capacity hours my logged days gained and lost in each month from June 2026",
  parents: ["all-about-alan-topic/why-i-am-not-breaking-past-three"],
  related: ["all-about-alan-topic/the-eight-weeks-i-tracked"],
  settled:
    "These figures are my logged days run through my own cost table and read back to me, so they are a reading of the record rather than something I said. My logs before 19 June 2026 have no session detail, so they are not priced.\n\nJune from the 19th: 12 days logged, +54 over 11 days, −5 over 1, net +49, +4.1 a day.\n\nJuly, 11 days missing: 20 logged, +103 over 12 days, −53 over 8, net +50, +2.5 a day.\n\nAugust: 31 logged, +285 over 28 days, −16 over 3, net +269, +8.7 a day.\n\nSeptember: 30 logged, +312 over 25 days, −100 over 5, net +212, +7.1 a day.\n\nOctober: 31 logged, +279 over 25 days, −194 over 6, net +86, +2.8 a day.\n\nThe positive side has held at about 280 to 310 a month since August. What has grown is the negative side: −16, then −100, then −194.",
  createdAt: "2026-11-01T12:52:37.708Z",
  updatedAt: "2026-11-01T12:52:37.708Z",
} as const satisfies AllAboutAlanTopic
