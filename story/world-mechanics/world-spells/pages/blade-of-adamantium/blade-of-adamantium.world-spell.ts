import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bladeOfAdamantium = {
  id: "01a06572-95b6-7249-ab19-525602fa6f84",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blade-of-adamantium",
  title: "Blade of Adamantium",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
