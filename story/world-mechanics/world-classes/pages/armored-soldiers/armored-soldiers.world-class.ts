import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const armoredSoldiers = {
  id: "01a0657e-1330-7b29-ae77-57639a702e6a",
  type: "world-class",
  slug: "armored-soldiers",
  title: "Armored Soldiers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
