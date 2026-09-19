import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witchHunter = {
  id: "01a0657e-0271-777f-ac27-546edb8e5cd2",
  type: "page-type/world-class",
  slug: "witch-hunter",
  title: "Witch Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
