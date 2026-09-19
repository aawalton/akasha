import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const medic = {
  id: "01a0657e-0230-7242-a2d5-3bf3532c1ca4",
  type: "page-type/world-class",
  slug: "medic",
  title: "Medic",
  world: "world/the-wandering-inn",
  aliases: ["medics"],
  references: "jsonl",
} as const satisfies WorldClass
