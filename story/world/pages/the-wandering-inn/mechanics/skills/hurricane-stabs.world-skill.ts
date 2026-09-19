import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hurricaneStabs = {
  id: "01a06575-981b-7768-bff4-33004e5a21f9",
  type: "page-type/world-skill",
  slug: "hurricane-stabs",
  title: "Hurricane Stabs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
