import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enforceRuleWorldOfSongAndVerse = {
  id: "01a06575-9808-756b-814c-48c95d43d88d",
  type: "page-type/world-skill",
  slug: "enforce-rule-world-of-song-and-verse",
  title: "Enforce Rule: World of Song and Verse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
