import type { OverwhereIvSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/overwhere-iv-skill.page-type.types.ts"

export const overwhereIvNalaRiftRend = {
  id: "01a0f3e0-adef-7e68-85e7-9675a621998e",
  type: "page-type/overwhere-iv-skill",
  slug: "overwhere-iv-nala-rift-rend",
  title: "Rift Rend",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A spell of Dimension Magic: a thin cut in space itself, parting whatever lies along it.",
  character: "character-player/overwhere-iv-nala",
  skill: "world-skill/overwhere-iv-rift-rend",
  level: 2,
  reachPaces: 40,
  manaCost: 8,
  durationMinutes: 0,
} as const satisfies OverwhereIvSkill
