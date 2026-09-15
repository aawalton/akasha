import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const assignHeroicQuests = {
  id: "01a06575-97ee-78a3-b54e-a1a25ca62119",
  type: "world-skill",
  slug: "assign-heroic-quests",
  title: "Assign Heroic Quests",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
