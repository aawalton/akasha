import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const manaWell = {
  id: "01a0657d-0242-70c7-85d0-e60bc8660929",
  type: "world-skill",
  slug: "mana-well",
  title: "Mana Well",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
