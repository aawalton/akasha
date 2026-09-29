import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvRiftRend = {
  id: "01a0ed1c-03da-7f48-8373-9cbaaa852558",
  type: "page-type/world-skill",
  slug: "overwhere-iv-rift-rend",
  title: "Rift Rend",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A spell of Dimension Magic: a thin cut in space itself, parting whatever lies along it.",
  aliases: ["Spatial Severing"],
  manaCost: 8,
  durationMinutes: 0,
} as const satisfies WorldSkill
