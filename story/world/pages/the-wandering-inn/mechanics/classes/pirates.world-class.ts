import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirates = {
  id: "01a0657e-023d-7f4b-ad4b-7c90db853d2b",
  type: "page-type/world-class",
  slug: "pirates",
  title: "Pirates",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
