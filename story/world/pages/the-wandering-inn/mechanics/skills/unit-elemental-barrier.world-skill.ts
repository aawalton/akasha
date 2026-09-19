import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitElementalBarrier = {
  id: "01a0657d-031f-7814-a964-5b05e19f10bb",
  type: "page-type/world-skill",
  slug: "unit-elemental-barrier",
  title: "Unit: Elemental Barrier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
