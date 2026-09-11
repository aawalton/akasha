import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iHaveSeenItDie = {
  id: "01a06575-981b-7d80-a68b-42d50816271b",
  type: "world-skill",
  slug: "i-have-seen-it-die",
  title: "I Have Seen It Die",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
