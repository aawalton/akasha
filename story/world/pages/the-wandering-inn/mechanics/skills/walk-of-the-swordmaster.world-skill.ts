import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const walkOfTheSwordmaster = {
  id: "01a0657d-032c-762c-afef-044e628f29eb",
  type: "page-type/world-skill",
  slug: "walk-of-the-swordmaster",
  title: "Walk of the Swordmaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
