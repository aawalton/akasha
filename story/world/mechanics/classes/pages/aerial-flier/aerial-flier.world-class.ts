import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const aerialFlier = {
  id: "01a0657e-1326-7639-a707-0816235d3d62",
  type: "page-type/world-class",
  slug: "aerial-flier",
  title: "Aerial Flier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
