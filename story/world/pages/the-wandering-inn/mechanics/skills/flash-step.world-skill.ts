import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashStep = {
  id: "01a06575-980e-7dee-a887-04a4b4f3991e",
  type: "page-type/world-skill",
  slug: "flash-step",
  title: "Flash Step",
  world: "world/the-wandering-inn",
  appearanceCount: 46,
  aliases: ["flash-steps"],
  evolvesFromSlugs: ["world-skill/quick-step"],
  references: "jsonl",
} as const satisfies WorldSkill
