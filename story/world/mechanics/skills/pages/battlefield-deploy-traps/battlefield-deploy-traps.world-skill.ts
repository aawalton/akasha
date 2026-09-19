import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldDeployTraps = {
  id: "01a06575-97f4-70ba-add2-b1d4fa2f7c36",
  type: "page-type/world-skill",
  slug: "battlefield-deploy-traps",
  title: "Battlefield: Deploy Traps",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
