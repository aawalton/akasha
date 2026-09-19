import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mentalClarity = {
  id: "01a06572-95d2-7f3d-8905-3bf7ec9a6086",
  type: "page-type/world-spell",
  slug: "mental-clarity",
  title: "Mental Clarity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
