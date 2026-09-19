import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fletcher = {
  id: "01a0657e-1365-79c8-bc4e-edd3f48d222a",
  type: "page-type/world-class",
  slug: "fletcher",
  title: "Fletcher",
  world: "world/the-wandering-inn",
  aliases: ["fletchers"],
  references: "jsonl",
} as const satisfies WorldClass
