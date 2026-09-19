import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cargoCaptain = {
  id: "01a0657e-1346-75fa-98a4-c6686fd8185b",
  type: "page-type/world-class",
  slug: "cargo-captain",
  title: "Cargo Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
