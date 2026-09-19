import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const travellers = {
  id: "01a0657e-026d-75ab-ac02-7e99c38fd5ba",
  type: "page-type/world-class",
  slug: "travellers",
  title: "Travellers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
