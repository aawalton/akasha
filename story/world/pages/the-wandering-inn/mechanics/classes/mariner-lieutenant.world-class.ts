import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const marinerLieutenant = {
  id: "01a0657e-022c-7c63-ab4e-190b306a83aa",
  type: "page-type/world-class",
  slug: "mariner-lieutenant",
  title: "Mariner Lieutenant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
