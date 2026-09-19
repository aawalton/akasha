import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createHiddenDoor = {
  id: "01a06575-97fe-7c04-bb30-e08f6aeecab0",
  type: "page-type/world-skill",
  slug: "create-hidden-door",
  title: "Create Hidden Door",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
