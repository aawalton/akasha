import type { WorldItem } from "../../world-item.page-type.ts"

export const vorpalSword = {
  id: "01a0655a-7b80-7686-9bce-b046ad02a233",
  pageTypeSlug: "world-item",
  slug: "vorpal-sword",
  title: "Vorpal Sword",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
