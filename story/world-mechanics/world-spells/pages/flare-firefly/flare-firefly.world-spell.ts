import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flareFirefly = {
  id: "01a06572-95c3-783e-8092-3c84d2c80614",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flare-firefly",
  title: "Flare Firefly",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
