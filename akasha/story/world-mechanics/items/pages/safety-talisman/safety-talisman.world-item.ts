import type { WorldItem } from "../../world-item.page-type.ts"

export const safetyTalisman = {
  id: "01a0655a-7b7f-774c-bbda-3e8e5764824e",
  pageTypeSlug: "world-item",
  slug: "safety-talisman",
  title: "Safety Talisman",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
