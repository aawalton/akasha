import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitMassedAttack = {
  id: "01a0657d-031f-7976-ba98-5671fda04f5e",
  type: "page-type/world-skill",
  slug: "unit-massed-attack",
  title: "Unit: Massed Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
