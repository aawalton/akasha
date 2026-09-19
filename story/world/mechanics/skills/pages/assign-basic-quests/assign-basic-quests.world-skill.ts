import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assignBasicQuests = {
  id: "01a06575-97ee-793b-b93c-9a8dbaa75e4c",
  type: "page-type/world-skill",
  slug: "assign-basic-quests",
  title: "Assign Basic Quests",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
