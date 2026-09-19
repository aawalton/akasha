import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const lanternCrafter = {
  id: "01a0657e-138c-7cd0-8079-e9d56f298082",
  type: "page-type/world-class",
  slug: "lantern-crafter",
  title: "Lantern Crafter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
