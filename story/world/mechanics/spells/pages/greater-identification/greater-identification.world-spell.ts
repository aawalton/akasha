import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterIdentification = {
  id: "01a06572-95c7-7590-8de4-53230a20ab7f",
  type: "page-type/world-spell",
  slug: "greater-identification",
  title: "Greater Identification",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
