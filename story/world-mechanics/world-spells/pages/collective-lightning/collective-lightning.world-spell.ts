import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const collectiveLightning = {
  id: "01a06572-95b9-7dd9-9bc5-d997c6905bb4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "collective-lightning",
  title: "Collective Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
