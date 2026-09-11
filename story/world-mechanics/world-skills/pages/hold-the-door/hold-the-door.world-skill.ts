import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const holdTheDoor = {
  id: "01a06575-981a-75e5-aac3-f9bff904813f",
  type: "world-skill",
  slug: "hold-the-door",
  title: "Hold the Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
