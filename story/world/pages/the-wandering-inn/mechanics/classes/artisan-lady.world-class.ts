import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artisanLady = {
  id: "01a0657e-1331-79a7-9032-e78cdb832684",
  type: "page-type/world-class",
  slug: "artisan-lady",
  title: "Artisan Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
