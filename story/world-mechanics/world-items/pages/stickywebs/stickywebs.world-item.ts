import type { WorldItem } from "../../world-item.page-type.ts"

export const stickywebs = {
  id: "01a0655a-7b80-7adc-98ce-3d0a6daf2050",
  pageTypeSlug: "world-item",
  type: "world-item",
  slug: "stickywebs",
  title: "Stickywebs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
