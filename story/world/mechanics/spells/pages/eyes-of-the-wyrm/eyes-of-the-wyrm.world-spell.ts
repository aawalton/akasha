import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const eyesOfTheWyrm = {
  id: "01a06572-95bf-787a-af00-a097c1ff592c",
  type: "page-type/world-spell",
  slug: "eyes-of-the-wyrm",
  title: "Eyes of the Wyrm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
