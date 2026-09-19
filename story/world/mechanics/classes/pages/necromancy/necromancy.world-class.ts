import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const necromancy = {
  id: "01a0657e-0234-7414-9bd6-3bd00b479d33",
  type: "page-type/world-class",
  slug: "necromancy",
  title: "Necromancy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
