import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const chainLightning = {
  id: "01a06572-95b8-78fe-83df-94bd4e36b770",
  type: "world-spell",
  slug: "chain-lightning",
  title: "Chain Lightning",
  world: "the-wandering-inn",
  aliases: ["Chain…Lightning"],
  references: "jsonl",
} as const satisfies WorldSpell
