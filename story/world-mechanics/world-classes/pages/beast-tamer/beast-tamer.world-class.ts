import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const beastTamer = {
  id: "01a0657e-01b7-758d-afdb-180671fe9c20",
  type: "world-class",
  slug: "beast-tamer",
  title: "Beast Tamer",
  world: "the-wandering-inn",
  aliases: ["beast-tamers"],
  references: "jsonl",
} as const satisfies WorldClass
