import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bodyOfDiamond = {
  id: "01a06572-95b6-7db4-949c-3bef1d731ea6",
  type: "page-type/world-spell",
  slug: "body-of-diamond",
  title: "Body of Diamond",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
