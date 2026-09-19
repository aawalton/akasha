import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidFire = {
  id: "01a0657d-02a4-76db-b897-960760a3ce45",
  type: "page-type/world-skill",
  slug: "rapid-fire",
  title: "Rapid Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
