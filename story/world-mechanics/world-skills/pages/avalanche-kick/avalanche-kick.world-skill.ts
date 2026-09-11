import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const avalancheKick = {
  id: "01a06575-97f1-7d8d-a194-b86cdc52bd42",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "avalanche-kick",
  title: "Avalanche Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
