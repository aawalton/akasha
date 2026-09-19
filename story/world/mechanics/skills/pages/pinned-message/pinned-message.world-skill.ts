import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinnedMessage = {
  id: "01a0657d-0294-72c7-a978-487bb333aca5",
  type: "page-type/world-skill",
  slug: "pinned-message",
  title: "Pinned Message",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
