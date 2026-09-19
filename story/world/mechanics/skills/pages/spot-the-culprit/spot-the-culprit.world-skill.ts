import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spotTheCulprit = {
  id: "01a0657d-02ee-794f-a195-8e00e6f4dfaf",
  type: "page-type/world-skill",
  slug: "spot-the-culprit",
  title: "Spot the Culprit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
