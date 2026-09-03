import type { WorldSkill } from "../../world-skill.page-type.ts"

export const flashStep = {
  id: "01a06575-980e-7dee-a887-04a4b4f3991e",
  pageTypeSlug: "world-skill",
  slug: "flash-step",
  title: "Flash Step",
  worldSlug: "the-wandering-inn",
  aliases: ["flash-steps"],
  evolvesFromSlugs: ["quick-step"],
  references: "jsonl",
} as const satisfies WorldSkill
