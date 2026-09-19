import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const avenger = {
  id: "01a0657e-1336-72be-9b24-e70b3c3faf96",
  type: "page-type/world-class",
  slug: "avenger",
  title: "Avenger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
