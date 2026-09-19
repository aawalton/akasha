import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fieldOfDetectHeat = {
  id: "01a06572-95c0-7a93-ac30-1f40e92165d2",
  type: "page-type/world-spell",
  slug: "field-of-detect-heat",
  title: "Field of Detect Heat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
