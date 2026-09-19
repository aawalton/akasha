import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const doomseeker = {
  id: "01a0657e-01d0-711d-b5a7-5251c8641796",
  type: "page-type/world-class",
  slug: "doomseeker",
  title: "Doomseeker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
