import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cauldronOfTheSalamander = {
  id: "01a06572-95b8-783c-9578-177a15f56ece",
  type: "page-type/world-spell",
  slug: "cauldron-of-the-salamander",
  title: "Cauldron of the Salamander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
