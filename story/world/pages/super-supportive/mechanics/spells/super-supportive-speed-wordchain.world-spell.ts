import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSpeedWordchain = {
  id: "01a0e9fb-2b67-781e-8a3f-f9cc2615d665",
  type: "page-type/world-spell",
  slug: "super-supportive-speed-wordchain",
  title: "Speed wordchain",
  world: "world/super-supportive",
  aliases: ["mild speed booster"],
  description:
    "A wordchain that gives a small boost to speed, like instantly gaining a few foundation points in Speed.",
  createdAt: "2026-09-28T21:45:47.111Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldSpell
