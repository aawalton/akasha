import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const spotTheCulprit = {
  id: "01a0657d-02ee-794f-a195-8e00e6f4dfaf",
  type: "world-skill",
  slug: "spot-the-culprit",
  title: "Spot the Culprit",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
