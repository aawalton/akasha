import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaConversionSustenance = {
  id: "01a0657d-0242-76f4-91b3-9bbab28c8b29",
  type: "page-type/world-skill",
  slug: "mana-conversion-sustenance",
  title: "Mana Conversion – Sustenance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
