import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steadyHooves = {
  id: "01a0657d-02f2-7c69-9bdc-5c5834276fa7",
  type: "page-type/world-skill",
  slug: "steady-hooves",
  title: "Steady Hooves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
