import type { WorldSpell } from "../../world-spell.page-type.ts"

export const spellSwarm = {
  id: "01a06572-95e2-7a64-ba5d-d75dc59e29af",
  pageTypeSlug: "world-spell",
  slug: "spell-swarm",
  title: "Spell Swarm",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
