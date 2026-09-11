import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sharedSkillTellMeEverything = {
  id: "01a0657d-02bf-78dd-aa84-61805d4e5a98",
  type: "world-skill",
  slug: "shared-skill-tell-me-everything",
  title: "Shared Skill: Tell Me Everything",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
