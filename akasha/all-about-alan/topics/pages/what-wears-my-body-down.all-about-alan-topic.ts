import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatWearsMyBodyDown = {
  id: "01a06559-9d65-7a8e-a6aa-de15db324edb",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-wears-my-body-down",
  title: "What Wears My Body Down",
  definition: "the cost of carrying stress over years, and how much of it I can clear",
  parentSlugs: ["health-bar"],
  relatedSlugs: ["what-limits-me", "what-calms-me-down"],
  settled:
    "It is the bottleneck everything else sits under, ahead of any one organ or diagnosis.\n\nI breathe eight to twelve hours a day. The whole recovery stack exists to defend this one thing.\n\nI cannot feel the load at all, so I work over the list of usual sources and follow whatever is left.\n\nEvery trip for ten years put me past capacity and ended in illness. The current one lands merely at the edge, and being overwhelmed is still my base case.",
  unsettled:
    "A proxy that tracks the load down as a source closes, heart rate variability or cortisol or inflammatory markers, would turn the reasoning into a measurement.\n\nThe list of usual sources has never been written out with each marked covered, partial or open, so what is left is asserted rather than auditable.\n\nWhether some source particular to me sits off that list is exactly what ruling things out cannot reach. Grinding a problem at the edge of sleep is one candidate.",
} as const satisfies AllAboutAlanTopic
