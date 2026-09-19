import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shapechanger = {
  id: "01a0657e-0253-725e-bdb3-aaf387b6c1ca",
  type: "page-type/world-class",
  slug: "shapechanger",
  title: "Shapechanger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
