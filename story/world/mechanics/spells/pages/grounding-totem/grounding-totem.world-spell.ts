import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const groundingTotem = {
  id: "01a06572-95c7-7c41-b3b4-2e2fa4a74fb2",
  type: "page-type/world-spell",
  slug: "grounding-totem",
  title: "Grounding Totem",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
