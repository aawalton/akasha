import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvRiftGate = {
  id: "01a0ed2b-3868-7a8c-9655-aa67ab988c0b",
  type: "page-type/world-skill",
  slug: "overwhere-iv-rift-gate",
  title: "Rift Gate",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A spell of Dimension Magic: a doorway torn from here straight to a beacon, however far.",
  manaCost: 30,
  durationMinutes: 1,
  createdAt: "2026-09-29T12:37:07.816Z",
  updatedAt: "2026-09-29T12:37:11.000Z",
} as const satisfies WorldSkill
