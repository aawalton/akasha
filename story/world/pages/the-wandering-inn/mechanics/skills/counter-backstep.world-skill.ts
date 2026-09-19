import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterBackstep = {
  id: "01a06575-97fe-783b-b287-4d860158c7af",
  type: "page-type/world-skill",
  slug: "counter-backstep",
  title: "Counter Backstep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
