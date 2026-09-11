import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bindSpellDisintegrationRay = {
  id: "01a06572-95b5-709b-a875-6abefde9f42e",
  type: "world-spell",
  slug: "bind-spell-disintegration-ray",
  title: "Bind Spell: Disintegration Ray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
