import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fastFireball = {
  id: "01a06572-95c0-7499-8194-5d655c8fafff",
  type: "page-type/world-spell",
  slug: "fast-fireball",
  title: "Fast Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 17,
  aliases: ["Fast Fireball!"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
