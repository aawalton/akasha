import type { WorldItem } from "../../world-item.page-type.types.ts"

export const vorpalSword = {
  id: "01a0655a-7b80-7686-9bce-b046ad02a233",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "vorpal-sword",
  title: "Vorpal Sword",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
