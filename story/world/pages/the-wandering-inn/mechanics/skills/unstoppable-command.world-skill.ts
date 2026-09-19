import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unstoppableCommand = {
  id: "01a0657d-031f-7559-b4be-ac695a85e28c",
  type: "page-type/world-skill",
  slug: "unstoppable-command",
  title: "Unstoppable Command",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
