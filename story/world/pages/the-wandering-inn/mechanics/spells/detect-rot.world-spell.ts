import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectRot = {
  id: "01a06572-95bd-7048-a71b-9eca264a58c7",
  type: "page-type/world-spell",
  slug: "detect-rot",
  title: "Detect Rot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
