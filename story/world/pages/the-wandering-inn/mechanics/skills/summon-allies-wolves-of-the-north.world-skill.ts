import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonAlliesWolvesOfTheNorth = {
  id: "01a0657d-02fe-7c43-ac30-c245446751b1",
  type: "page-type/world-skill",
  slug: "summon-allies-wolves-of-the-north",
  title: "Summon Allies: Wolves of the North",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
