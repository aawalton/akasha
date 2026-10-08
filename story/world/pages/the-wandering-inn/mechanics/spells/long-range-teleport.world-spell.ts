import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const longRangeTeleport = {
  id: "01a06572-95d0-7e1e-9e57-11e79bc51159",
  type: "page-type/world-spell",
  slug: "long-range-teleport",
  title: "Long Range Teleport",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  aliases: ["Long-Range Teleport"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
