import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const impactShield = {
  id: "01a06572-95cb-7a5b-898c-ab9af7d059f2",
  type: "world-spell",
  slug: "impact-shield",
  title: "Impact Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
