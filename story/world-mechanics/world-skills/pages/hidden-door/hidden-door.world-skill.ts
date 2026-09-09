import type { WorldSkill } from "../../world-skill.page-type.ts"

export const hiddenDoor = {
  id: "01a06575-981a-7850-afc7-cd99999b120a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hidden-door",
  title: "Hidden Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
