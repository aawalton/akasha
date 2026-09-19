import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shopkeeperAttendant = {
  id: "01a0657e-0254-7eab-bcca-4a4c4495c6f7",
  type: "page-type/world-class",
  slug: "shopkeeper-attendant",
  title: "Shopkeeper Attendant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
