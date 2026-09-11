import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const killerFishiesAttack = {
  id: "01a06575-9821-7881-b469-694f27b36f6d",
  type: "world-skill",
  slug: "killer-fishies-attack",
  title: "Killer Fishies Attack",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
