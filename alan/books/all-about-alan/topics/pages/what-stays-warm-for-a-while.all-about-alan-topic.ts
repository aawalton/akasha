import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatStaysWarmForAWhile = {
  id: "01a06559-9d65-7bbb-bc16-b0115cda5e63",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-stays-warm-for-a-while",
  title: "What Stays Warm For A While",
  definition: "why something I touched recently is cheaper to reach for",
  parentSlugs: ["how-my-attention-works"],
  relatedSlugs: ["how-a-skill-gets-into-me"],
  settled:
    "I hold one model at a time, and a live interaction overwrites it the instant I am in it.\n\nThe good of preparing is not that it is still loaded. It is that the associations were recently touched and come cheap.\n\nOne set is warm at a time, the same single room as the model.",
  unsettled:
    "The freshness fades over about a day to almost nothing, which is a guess I hold at about one in five.",
} as const satisfies AllAboutAlanTopic
