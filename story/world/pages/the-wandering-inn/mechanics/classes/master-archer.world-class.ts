import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterArcher = {
  id: "01a0657e-139e-7890-82f0-3d7182ded1d5",
  type: "page-type/world-class",
  slug: "master-archer",
  title: "Master Archer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
