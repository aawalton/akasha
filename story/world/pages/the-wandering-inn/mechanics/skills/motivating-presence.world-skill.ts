import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const motivatingPresence = {
  id: "01a0657d-026f-736b-85b7-f9af3c3ba45d",
  type: "page-type/world-skill",
  slug: "motivating-presence",
  title: "Motivating Presence",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
