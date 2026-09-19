import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidConversation = {
  id: "01a0657d-02a4-783a-8420-14c95b64a15e",
  type: "page-type/world-skill",
  slug: "rapid-conversation",
  title: "Rapid Conversation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
