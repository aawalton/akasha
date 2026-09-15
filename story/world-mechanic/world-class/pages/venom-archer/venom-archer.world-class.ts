import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const venomArcher = {
  id: "01a06586-0a6f-7609-8333-536f4f879065",
  type: "world-class",
  slug: "venom-archer",
  title: "Venom Archer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
