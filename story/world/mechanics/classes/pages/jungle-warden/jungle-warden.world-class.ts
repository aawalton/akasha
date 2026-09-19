import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const jungleWarden = {
  id: "01a0657e-020b-7fe7-bd2e-45c94f97a504",
  type: "page-type/world-class",
  slug: "jungle-warden",
  title: "Jungle Warden",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
