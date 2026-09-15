import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const reducedWeight = {
  id: "01a06572-95dc-7222-ad9e-40eab820c127",
  type: "world-spell",
  slug: "reduced-weight",
  title: "Reduced Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
