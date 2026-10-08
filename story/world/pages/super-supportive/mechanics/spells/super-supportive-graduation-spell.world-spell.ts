import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveGraduationSpell = {
  id: "01a0e9f2-f147-7ddd-a704-c6eba10d8508",
  type: "page-type/world-spell",
  slug: "super-supportive-graduation-spell",
  title: "Year Six graduation spell",
  world: "world/super-supportive",
  aliases: ["graduation spell", "square punch spell"],
  description: "An auriad spell that throws a square hammer of force.",
  createdAt: "2026-09-28T21:36:47.943Z",
  updatedAt: "2026-09-28T21:36:51.000Z",
} as const satisfies WorldSpell
