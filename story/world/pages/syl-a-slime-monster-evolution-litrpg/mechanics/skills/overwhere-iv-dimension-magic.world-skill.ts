import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvDimensionMagic = {
  id: "01a0ed1c-03da-726e-b637-7489b7f4fc01",
  type: "page-type/world-skill",
  slug: "overwhere-iv-dimension-magic",
  title: "Dimension Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "The legacy magic of space: crossing, cutting and folding the distance between places.",
  aliases: ["Dimensional Magic", "dimensional affinity", "dimension affinity"],
  manaCost: 5,
  durationMinutes: 1,
  createdAt: "2026-09-29T12:20:31.322Z",
  updatedAt: "2026-09-29T12:20:34.000Z",
} as const satisfies WorldSkill
