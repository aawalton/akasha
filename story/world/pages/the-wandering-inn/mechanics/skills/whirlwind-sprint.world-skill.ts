import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlwindSprint = {
  id: "01a0657d-032e-7130-a717-ed585b140bb1",
  type: "page-type/world-skill",
  slug: "whirlwind-sprint",
  title: "Whirlwind Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
