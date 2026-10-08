import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sharedSkillTellMeEverything = {
  id: "01a0657d-02bf-78dd-aa84-61805d4e5a98",
  type: "page-type/world-skill",
  slug: "shared-skill-tell-me-everything",
  title: "Shared Skill: Tell Me Everything",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.655Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
