import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const locustStorm = {
  id: "01a06572-95d0-74e2-b890-aa89c14efcaa",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "locust-storm",
  title: "Locust Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
