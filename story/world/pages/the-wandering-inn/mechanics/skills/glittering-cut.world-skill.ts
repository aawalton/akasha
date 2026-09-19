import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const glitteringCut = {
  id: "01a06575-9815-7d8c-b0a7-51cf48a9b9a2",
  type: "page-type/world-skill",
  slug: "glittering-cut",
  title: "Glittering Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
