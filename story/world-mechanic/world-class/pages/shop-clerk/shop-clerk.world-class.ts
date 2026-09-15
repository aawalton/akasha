import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const shopClerk = {
  id: "01a0657e-0254-7e91-b1ce-3dd9c4e08ffd",
  type: "world-class",
  slug: "shop-clerk",
  title: "Shop Clerk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
