import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const battlefieldDeployTraps = {
  id: "01a06575-97f4-70ba-add2-b1d4fa2f7c36",
  type: "world-skill",
  slug: "battlefield-deploy-traps",
  title: "Battlefield: Deploy Traps",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
