import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicImage = {
  id: "01a06572-95d1-72ae-bbc5-f12caf6bfa74",
  type: "world-spell",
  slug: "magic-image",
  title: "Magic Image",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
