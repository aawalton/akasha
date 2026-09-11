import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flashStep = {
  id: "01a06575-980e-7dee-a887-04a4b4f3991e",
  type: "world-skill",
  slug: "flash-step",
  title: "Flash Step",
  world: "the-wandering-inn",
  aliases: ["flash-steps"],
  evolvesFromSlugs: ["quick-step"],
  references: "jsonl",
} as const satisfies WorldSkill
