import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonFlameElemental = {
  id: "01a0657d-02fe-7589-ae31-9bfd761d0d53",
  type: "page-type/world-skill",
  slug: "summon-flame-elemental",
  title: "Summon Flame Elemental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
