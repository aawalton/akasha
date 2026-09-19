import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bodyOfMithril = {
  id: "01a06572-95b6-7350-a56b-c2c04186a866",
  type: "page-type/world-spell",
  slug: "body-of-mithril",
  title: "Body of Mithril",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
