import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSpellOfOldWounds = {
  id: "01a0e9f7-9e6e-72da-b245-93205d98cd3c",
  type: "page-type/world-spell",
  slug: "super-supportive-spell-of-old-wounds",
  title: "spell of old wounds",
  world: "world/super-supportive",
  description: "A spell that reopens previously healed wounds.",
} as const satisfies WorldSpell
