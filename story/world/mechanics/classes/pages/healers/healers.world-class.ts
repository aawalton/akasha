import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const healers = {
  id: "01a0657e-1372-7075-a705-c617f77751f1",
  type: "page-type/world-class",
  slug: "healers",
  title: "Healers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
