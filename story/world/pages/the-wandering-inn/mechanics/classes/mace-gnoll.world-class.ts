import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maceGnoll = {
  id: "01a0657e-1391-75ce-9179-86df3518d0c4",
  type: "page-type/world-class",
  slug: "mace-gnoll",
  title: "Mace Gnoll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
