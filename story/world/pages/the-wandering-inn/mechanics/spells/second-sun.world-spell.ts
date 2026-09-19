import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const secondSun = {
  id: "01a06572-95df-746a-833e-66f1d78c0d68",
  type: "page-type/world-spell",
  slug: "second-sun",
  title: "Second Sun",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
