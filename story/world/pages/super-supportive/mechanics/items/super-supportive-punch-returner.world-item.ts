import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePunchReturner = {
  id: "01a0e9fc-0701-7bf6-9144-345112e31068",
  type: "page-type/world-item",
  slug: "super-supportive-punch-returner",
  title: "Punch returner",
  world: "world/super-supportive",
  description: "A single-use Wrightmade device that returns a punch.",
} as const satisfies WorldItem
