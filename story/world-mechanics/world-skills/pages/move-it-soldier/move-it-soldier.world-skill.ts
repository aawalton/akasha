import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const moveItSoldier = {
  id: "01a0657d-0270-72ed-b58e-a4fd0a1ca884",
  type: "world-skill",
  slug: "move-it-soldier",
  title: "Move It, Soldier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
