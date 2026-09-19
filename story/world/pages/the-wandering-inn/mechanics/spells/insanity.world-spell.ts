import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const insanity = {
  id: "01a06572-95cb-75ab-a89d-45337f0f79f3",
  type: "page-type/world-spell",
  slug: "insanity",
  title: "Insanity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
