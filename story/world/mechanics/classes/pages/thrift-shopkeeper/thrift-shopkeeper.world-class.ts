import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const thriftShopkeeper = {
  id: "01a06586-0a67-7389-9a11-7714b00a7225",
  type: "page-type/world-class",
  slug: "thrift-shopkeeper",
  title: "Thrift Shopkeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
