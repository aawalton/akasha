import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bloodmage = {
  id: "01a0657e-133f-78d2-9b33-b5ea5c4873f0",
  type: "page-type/world-class",
  slug: "bloodmage",
  title: "Bloodmage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
