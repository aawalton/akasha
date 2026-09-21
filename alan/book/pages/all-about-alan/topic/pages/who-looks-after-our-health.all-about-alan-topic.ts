import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whoLooksAfterOurHealth = {
  id: "01a0c5a3-00e7-7a7b-bc74-4ad4e0719da8",
  type: "page-type/all-about-alan-topic",
  slug: "who-looks-after-our-health",
  title: "Who Looks After Our Health",
  definition: "the insurer, clinics, dentists and pharmacy the household uses, and their grades",
  parents: ["all-about-alan-topic/which-organisations-i-trust"],
  related: [
    "all-about-alan-topic/trusting-a-person-not-an-institution",
    "all-about-alan-topic/what-one-trust-score-carries",
  ],
  settled:
    "Select Health insures us at D. Nothing it has done in particular earns that: it is a large publicly traded health insurer, and the trade as a whole denies, delays and is paid to.\n\nIt sits upstream of everyone else here. Insurance is the gate that prices every other relationship on this list, so losing it changes how I pay for all of them.\n\nWe bought it on the federal marketplace, which grades C. That is a venue rather than an insurer, and what keeps it off B is that an administration can take it apart.\n\nCostco Pharmacy dispenses for us at B, strong on price and on treating a customer well.\n\nMy doctor grades B inside a clinic at C. The children's dentist grades B inside a practice at C, which also does the adults.\n\nWe see no specialists and nobody for the autism or the ADHD.\n\nThis is where the most B grades I hold are gathered, and every one of them is a person or a shop rather than a corporation.",
} as const satisfies AllAboutAlanTopic
