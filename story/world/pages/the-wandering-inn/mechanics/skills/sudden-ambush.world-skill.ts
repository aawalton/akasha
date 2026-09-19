import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const suddenAmbush = {
  id: "01a0657d-02fe-71f3-a20e-3a146b00d900",
  type: "page-type/world-skill",
  slug: "sudden-ambush",
  title: "Sudden Ambush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
