import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const manaReserve = {
  id: "01a0657d-0242-7369-b1e2-6a1cb961ed40",
  type: "world-skill",
  slug: "mana-reserve",
  title: "Mana Reserve",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
