import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const vampireHunters = {
  id: "01a0657e-026e-72be-9334-3d42591643cc",
  type: "page-type/world-class",
  slug: "vampire-hunters",
  title: "Vampire Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
