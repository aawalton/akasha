import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const armoredVeteran = {
  id: "01a0657e-01ab-72e0-bc06-0c62c7706623",
  type: "page-type/world-class",
  slug: "armored-veteran",
  title: "Armored Veteran",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
