import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blastproofHearing = {
  id: "01a06575-97f6-7d66-93bf-748f48f8e9f1",
  type: "page-type/world-skill",
  slug: "blastproof-hearing",
  title: "Blastproof Hearing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
