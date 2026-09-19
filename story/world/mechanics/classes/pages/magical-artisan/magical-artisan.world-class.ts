import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalArtisan = {
  id: "01a0657e-139b-78ff-9f73-daf010c737a2",
  type: "page-type/world-class",
  slug: "magical-artisan",
  title: "Magical Artisan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
