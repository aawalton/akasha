import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegrationRays = {
  id: "01a06572-95bd-75ce-8254-344b5e9a112e",
  type: "page-type/world-spell",
  slug: "disintegration-rays",
  title: "Disintegration Rays",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
