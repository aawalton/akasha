import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceMagic = {
  id: "01a0657d-02b1-7939-b506-623df29534e1",
  type: "page-type/world-skill",
  slug: "resistance-magic",
  title: "Resistance: Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
