import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const siren = {
  id: "01a0657e-0256-7d32-a643-52fe23d77700",
  type: "page-type/world-class",
  slug: "siren",
  title: "Siren",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
