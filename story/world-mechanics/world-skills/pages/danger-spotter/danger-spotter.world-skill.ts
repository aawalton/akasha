import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dangerSpotter = {
  id: "01a06575-9800-76f9-a22b-7937ee67d4a9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "danger-spotter",
  title: "Danger-Spotter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
