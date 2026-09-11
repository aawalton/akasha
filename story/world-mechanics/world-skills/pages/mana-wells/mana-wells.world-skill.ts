import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const manaWells = {
  id: "01a0657d-0242-7490-97f6-a8c37a5efda0",
  type: "world-skill",
  slug: "mana-wells",
  title: "Mana Wells",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
