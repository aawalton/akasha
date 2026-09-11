import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flamingSwathe = {
  id: "01a06572-95c3-73e7-aded-7d15de40366e",
  type: "world-spell",
  slug: "flaming-swathe",
  title: "Flaming Swathe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
