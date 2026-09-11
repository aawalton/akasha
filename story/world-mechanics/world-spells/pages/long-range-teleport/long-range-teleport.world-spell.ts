import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const longRangeTeleport = {
  id: "01a06572-95d0-7e1e-9e57-11e79bc51159",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "long-range-teleport",
  title: "Long Range Teleport",
  world: "the-wandering-inn",
  aliases: ["Long-Range Teleport"],
  references: "jsonl",
} as const satisfies WorldSpell
