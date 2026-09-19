import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const raidGeneral = {
  id: "01a0657e-0243-7927-8741-8731bc243441",
  type: "page-type/world-class",
  slug: "raid-general",
  title: "Raid General",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
