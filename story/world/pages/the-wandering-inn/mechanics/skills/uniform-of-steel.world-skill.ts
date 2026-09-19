import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const uniformOfSteel = {
  id: "01a0657d-031e-7242-89e7-14602fb4848f",
  type: "page-type/world-skill",
  slug: "uniform-of-steel",
  title: "Uniform of Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
