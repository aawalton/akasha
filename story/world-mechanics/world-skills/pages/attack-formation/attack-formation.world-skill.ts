import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const attackFormation = {
  id: "01a06575-97ee-7665-a851-f373362cb62c",
  type: "world-skill",
  slug: "attack-formation",
  title: "Attack Formation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
