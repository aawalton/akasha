import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashlight = {
  id: "01a06572-95c4-7d92-bafe-129526de7acf",
  type: "world-spell",
  slug: "flashlight",
  title: "Flashlight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
