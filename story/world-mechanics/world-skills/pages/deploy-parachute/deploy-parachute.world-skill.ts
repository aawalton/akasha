import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deployParachute = {
  id: "01a06575-9803-787f-b229-ca2efb3c4b11",
  type: "world-skill",
  slug: "deploy-parachute",
  title: "Deploy Parachute",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
