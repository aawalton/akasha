import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const renewSkill = {
  id: "01a0657d-02b0-75e8-b312-73913a61557f",
  type: "page-type/world-skill",
  slug: "renew-skill",
  title: "Renew Skill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
