import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minerSClaws = {
  id: "01a0657d-024d-7284-938b-ecaf6d2db1de",
  type: "page-type/world-skill",
  slug: "miner-s-claws",
  title: "Miner’s Claws",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
