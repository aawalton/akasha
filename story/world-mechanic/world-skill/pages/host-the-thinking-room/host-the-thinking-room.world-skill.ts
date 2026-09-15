import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const hostTheThinkingRoom = {
  id: "01a06575-981a-78fd-8f86-567a510e3ca5",
  type: "world-skill",
  slug: "host-the-thinking-room",
  title: "Host: The Thinking Room",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
