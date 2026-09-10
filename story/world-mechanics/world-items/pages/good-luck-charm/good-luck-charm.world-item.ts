import type { WorldItem } from "../../world-item.page-type.types.ts"

export const goodLuckCharm = {
  id: "01a0655a-7b7f-790b-8a5b-b08f555f375a",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "good-luck-charm",
  title: "Good Luck Charm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
