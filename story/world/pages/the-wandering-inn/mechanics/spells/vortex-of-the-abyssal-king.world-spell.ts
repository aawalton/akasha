import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const vortexOfTheAbyssalKing = {
  id: "01a06572-95e8-7c54-b778-7fe35a4955c8",
  type: "page-type/world-spell",
  slug: "vortex-of-the-abyssal-king",
  title: "Vortex of the Abyssal King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
