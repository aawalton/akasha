import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const airPlatform = {
  id: "01a06575-97ea-7432-a224-319440dda3ab",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "air-platform",
  title: "Air Platform",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
