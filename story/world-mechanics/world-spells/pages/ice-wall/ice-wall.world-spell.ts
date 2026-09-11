import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceWall = {
  id: "01a06572-95ca-7c86-9706-06d8ea78e8ee",
  type: "world-spell",
  slug: "ice-wall",
  title: "Ice Wall",
  world: "the-wandering-inn",
  aliases: ["Ice Wall!"],
  references: "jsonl",
} as const satisfies WorldSpell
