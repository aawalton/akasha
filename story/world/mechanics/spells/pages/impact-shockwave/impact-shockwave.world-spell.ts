import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const impactShockwave = {
  id: "01a06572-95cb-78c9-9e33-55482ecb9d7e",
  type: "page-type/world-spell",
  slug: "impact-shockwave",
  title: "Impact Shockwave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
