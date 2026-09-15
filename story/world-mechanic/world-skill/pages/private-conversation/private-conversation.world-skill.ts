import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const privateConversation = {
  id: "01a0657d-0297-7c5b-af19-7cc48ae6c024",
  type: "world-skill",
  slug: "private-conversation",
  title: "Private Conversation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
