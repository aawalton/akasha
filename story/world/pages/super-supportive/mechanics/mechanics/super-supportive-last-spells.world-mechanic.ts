import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveLastSpells = {
  id: "01a0e9f9-7733-7409-b720-e909497e09d6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-last-spells",
  title: "Last spells",
  world: "world/super-supportive",
  aliases: ["final spell"],
  description:
    "A celebration before a first binding where friends watch a wizard's last spells as an unbound caster.",
  createdAt: "2026-09-28T21:43:55.443Z",
  updatedAt: "2026-09-28T21:44:00.000Z",
} as const satisfies WorldMechanic
