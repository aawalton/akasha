import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theWeightedBlanket = {
  id: "01a06559-9d65-762e-b11c-095ca1fe26eb",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-weighted-blanket",
  title: "The Weighted Blanket",
  definition: "the blanket I put on when a night is going badly",
  parentSlugs: ["sleep"],
  settled:
    "Off by default. I reach for it on a bad night rather than keeping it on the bed.\n\nComfortable on the legs, where on the chest it blocks my breathing.\n\nIt works by stilling me and drawing heat off, so it helps when I am too hot rather than when I am cold.",
  unsettled:
    "It helps about half the times I reach for it, and nothing separates the hits from the misses.\n\nI first called it grounding and now reach for it for stillness and heat. Whether grounding still fires at all is open.\n\nWhether the blanket has thermal numbers that make the heat-sink account calculable is unasked.",
} as const satisfies AllAboutAlanTopic
