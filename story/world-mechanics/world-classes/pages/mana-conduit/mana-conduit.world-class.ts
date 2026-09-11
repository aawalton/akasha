import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const manaConduit = {
  id: "01a0657e-139d-70b7-9f31-7f7ab8704f1e",
  type: "world-class",
  slug: "mana-conduit",
  title: "Mana Conduit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
