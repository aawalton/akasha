import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstDiplomat = {
  id: "01a0657e-1364-770c-bd18-ceda45bbbfe5",
  type: "page-type/world-class",
  slug: "first-diplomat",
  title: "First Diplomat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
