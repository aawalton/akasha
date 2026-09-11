import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quakeBlade = {
  id: "01a0657d-029a-77e4-8976-2a9448ad3ebc",
  type: "world-skill",
  slug: "quake-blade",
  title: "Quake Blade",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
