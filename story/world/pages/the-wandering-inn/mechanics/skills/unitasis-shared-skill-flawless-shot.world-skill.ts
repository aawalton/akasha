import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitasisSharedSkillFlawlessShot = {
  id: "01a0657d-031f-743b-af47-1ac025d12ffb",
  type: "page-type/world-skill",
  slug: "unitasis-shared-skill-flawless-shot",
  title: "Unitasis Shared Skill: Flawless Shot",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-skill/unitasis-network"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.751Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
