import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memorizeRoutine = {
  id: "01a0657d-024c-7ec8-8ed4-8ff6b869d45b",
  type: "page-type/world-skill",
  slug: "memorize-routine",
  title: "Memorize Routine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
