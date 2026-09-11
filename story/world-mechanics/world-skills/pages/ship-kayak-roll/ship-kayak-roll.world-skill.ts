import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shipKayakRoll = {
  id: "01a0657d-02c0-721f-a16a-b83cfb562e4a",
  type: "world-skill",
  slug: "ship-kayak-roll",
  title: "Ship: Kayak Roll",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
