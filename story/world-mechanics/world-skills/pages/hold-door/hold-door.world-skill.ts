import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const holdDoor = {
  id: "01a06575-981a-7f8b-9af0-a372586b6ca9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hold-door",
  title: "Hold Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
