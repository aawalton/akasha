import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveLuckTradeWordchain = {
  id: "01a0e9f2-f148-710d-8ff8-dffea1dc09e1",
  type: "page-type/world-spell",
  slug: "super-supportive-luck-trade-wordchain",
  title: "Luck trade wordchain",
  world: "world/super-supportive",
  aliases: ["request for a trade of luck"],
  description:
    "A wordchain that asks another for their luck tonight and promises an equal portion back tomorrow.",
} as const satisfies WorldSpell
