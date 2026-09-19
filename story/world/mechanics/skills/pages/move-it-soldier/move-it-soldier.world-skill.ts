import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const moveItSoldier = {
  id: "01a0657d-0270-72ed-b58e-a4fd0a1ca884",
  type: "page-type/world-skill",
  slug: "move-it-soldier",
  title: "Move It, Soldier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
