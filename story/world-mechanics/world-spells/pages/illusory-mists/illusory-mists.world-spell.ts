import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const illusoryMists = {
  id: "01a06572-95cb-7e27-a422-48bb3ad29fa9",
  type: "world-spell",
  slug: "illusory-mists",
  title: "Illusory Mists",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
