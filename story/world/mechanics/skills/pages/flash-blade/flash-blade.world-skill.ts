import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashBlade = {
  id: "01a06575-980d-7f19-999a-344361c127e0",
  type: "page-type/world-skill",
  slug: "flash-blade",
  title: "Flash Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
