import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theWeightedBlanket = {
  id: "01a06559-9d65-762e-b11c-095ca1fe26eb",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-weighted-blanket",
  title: "The Weighted Blanket",
  definition: "the blanket I put on when a night is going badly",
  parents: ["sleep"],
  settled:
    "Off by default. I reach for it on a bad night rather than keeping it on the bed.\n\nComfortable on the legs, where on the chest it blocks my breathing.\n\nIt works by stilling me and drawing heat off, so it helps when I am too hot rather than when I am cold.",
} as const satisfies AllAboutAlanTopic
