import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const soulbard = {
  id: "01a0657e-025d-79b3-83c0-92a672eb8c86",
  type: "page-type/world-class",
  slug: "soulbard",
  title: "Soulbard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
