import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const truthOfTheHeavens = {
  id: "01a06572-95e7-728f-a6a0-5faae1319a2c",
  type: "world-spell",
  slug: "truth-of-the-heavens",
  title: "Truth of the Heavens",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
