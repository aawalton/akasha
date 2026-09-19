import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const waterproofFabric = {
  id: "01a0655a-7b80-7192-8358-b677123144af",
  type: "page-type/world-item",
  slug: "waterproof-fabric",
  title: "Waterproof Fabric",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldItem
