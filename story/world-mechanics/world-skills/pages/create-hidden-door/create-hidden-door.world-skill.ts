import type { WorldSkill } from "../../world-skill.page-type.ts"

export const createHiddenDoor = {
  id: "01a06575-97fe-7c04-bb30-e08f6aeecab0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "create-hidden-door",
  title: "Create Hidden Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
