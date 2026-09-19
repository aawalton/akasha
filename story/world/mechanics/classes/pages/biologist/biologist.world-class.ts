import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const biologist = {
  id: "01a0657e-01bb-7cbb-bcc4-cec3f9a4fa13",
  type: "page-type/world-class",
  slug: "biologist",
  title: "Biologist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
