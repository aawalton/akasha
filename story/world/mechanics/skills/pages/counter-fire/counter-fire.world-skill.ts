import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterFire = {
  id: "01a06575-97fe-7c11-8960-fb6fa33411ef",
  type: "page-type/world-skill",
  slug: "counter-fire",
  title: "Counter Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
