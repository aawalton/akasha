import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const impactShockwave = {
  id: "01a06572-95cb-78c9-9e33-55482ecb9d7e",
  type: "world-spell",
  slug: "impact-shockwave",
  title: "Impact Shockwave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
