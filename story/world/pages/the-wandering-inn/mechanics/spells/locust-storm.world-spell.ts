import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const locustStorm = {
  id: "01a06572-95d0-74e2-b890-aa89c14efcaa",
  type: "page-type/world-spell",
  slug: "locust-storm",
  title: "Locust Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
