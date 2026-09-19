import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seekerFlares = {
  id: "01a06572-95df-74a4-9daf-7101f272210f",
  type: "page-type/world-spell",
  slug: "seeker-flares",
  title: "Seeker Flares",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
