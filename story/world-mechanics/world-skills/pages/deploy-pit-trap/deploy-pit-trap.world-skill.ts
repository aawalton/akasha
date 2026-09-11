import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deployPitTrap = {
  id: "01a06575-9803-784c-9dc4-f71d32fc9de5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "deploy-pit-trap",
  title: "Deploy Pit Trap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
