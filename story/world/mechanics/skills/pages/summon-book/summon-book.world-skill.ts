import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonBook = {
  id: "01a0657d-02fe-7a21-990c-0a35026faa2a",
  type: "page-type/world-skill",
  slug: "summon-book",
  title: "Summon Book",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
