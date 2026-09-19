import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalGriffinPeck = {
  id: "01a0657d-02b7-7afa-a00e-a6fcf85985cf",
  type: "page-type/world-skill",
  slug: "royal-griffin-peck",
  title: "Royal Griffin Peck",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
