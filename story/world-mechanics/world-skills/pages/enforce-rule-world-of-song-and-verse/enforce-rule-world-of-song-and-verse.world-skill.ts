import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const enforceRuleWorldOfSongAndVerse = {
  id: "01a06575-9808-756b-814c-48c95d43d88d",
  type: "world-skill",
  slug: "enforce-rule-world-of-song-and-verse",
  title: "Enforce Rule: World of Song and Verse",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
