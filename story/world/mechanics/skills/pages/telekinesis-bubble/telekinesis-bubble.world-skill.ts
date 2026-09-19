import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const telekinesisBubble = {
  id: "01a0657d-0311-7f8c-a0fc-e374e6c28302",
  type: "page-type/world-skill",
  slug: "telekinesis-bubble",
  title: "Telekinesis: Bubble",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
