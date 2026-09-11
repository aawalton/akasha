import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shadowCut = {
  id: "01a0657d-02bf-7538-8393-c86052120d20",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "shadow-cut",
  title: "Shadow Cut",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
