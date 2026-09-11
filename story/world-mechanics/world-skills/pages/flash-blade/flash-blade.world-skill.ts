import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flashBlade = {
  id: "01a06575-980d-7f19-999a-344361c127e0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flash-blade",
  title: "Flash Blade",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
