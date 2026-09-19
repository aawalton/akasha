import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holdDoor = {
  id: "01a06575-981a-7f8b-9af0-a372586b6ca9",
  type: "page-type/world-skill",
  slug: "hold-door",
  title: "Hold Door",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
