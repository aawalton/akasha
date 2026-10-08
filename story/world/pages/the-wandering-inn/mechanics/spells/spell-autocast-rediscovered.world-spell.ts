import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellAutocastRediscovered = {
  id: "01a06572-95e2-768f-a488-4dff3fd0813f",
  type: "page-type/world-spell",
  slug: "spell-autocast-rediscovered",
  title: "Spell – Autocast Rediscovered!",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
