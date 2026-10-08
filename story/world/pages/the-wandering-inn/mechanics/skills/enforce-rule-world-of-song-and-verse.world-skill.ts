import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enforceRuleWorldOfSongAndVerse = {
  id: "01a06575-9808-756b-814c-48c95d43d88d",
  type: "page-type/world-skill",
  slug: "enforce-rule-world-of-song-and-verse",
  title: "Enforce Rule: World of Song and Verse",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.584Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
