import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTransformerOfLifeToWater = {
  id: "01a0e9fa-4782-7d94-bf30-a08dc6ab751b",
  type: "page-type/world-skill",
  slug: "super-supportive-transformer-of-life-to-water",
  title: "Transformer of Life to Water",
  world: "world/super-supportive",
  aliases: ["Life to Water"],
  description: "A knight skill named for turning life into water.",
} as const satisfies WorldSkill
