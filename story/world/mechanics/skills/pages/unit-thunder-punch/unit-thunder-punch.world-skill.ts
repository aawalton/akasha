import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitThunderPunch = {
  id: "01a0657d-031f-7a7c-8b58-bf6296e62f1f",
  type: "page-type/world-skill",
  slug: "unit-thunder-punch",
  title: "Unit: Thunder Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
