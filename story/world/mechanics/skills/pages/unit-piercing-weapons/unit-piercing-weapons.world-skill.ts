import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitPiercingWeapons = {
  id: "01a0657d-031f-7b48-aac5-0c3438efb514",
  type: "page-type/world-skill",
  slug: "unit-piercing-weapons",
  title: "Unit: Piercing Weapons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
