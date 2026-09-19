import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forcewalls = {
  id: "01a06572-95c5-73f2-9fac-dc7a78597f09",
  type: "page-type/world-spell",
  slug: "forcewalls",
  title: "Forcewalls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
