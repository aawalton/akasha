import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mitesOfSlumber = {
  id: "01a06572-95d9-709f-9d30-a3e120d5e32c",
  type: "page-type/world-spell",
  slug: "mites-of-slumber",
  title: "Mites of Slumber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
