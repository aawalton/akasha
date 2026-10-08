import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveLightCandle = {
  id: "01a0e9f2-f148-7ff3-8568-0aad2038137c",
  type: "page-type/world-spell",
  slug: "super-supportive-light-candle",
  title: "Light Candle",
  world: "world/super-supportive",
  aliases: ["promise stick lighting spell", "candle lighting spell"],
  description: "An F-rank spell for making small flames.",
  createdAt: "2026-09-28T21:36:47.944Z",
  updatedAt: "2026-09-28T21:36:51.000Z",
} as const satisfies WorldSpell
