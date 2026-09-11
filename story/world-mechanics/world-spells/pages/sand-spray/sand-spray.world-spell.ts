import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sandSpray = {
  id: "01a06572-95de-7dd6-8280-e0648248c632",
  type: "world-spell",
  slug: "sand-spray",
  title: "Sand Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
