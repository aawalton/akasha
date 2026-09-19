import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reverseDecayFifteenMinutes = {
  id: "01a0657d-02b1-7041-aace-874decc03e2b",
  type: "page-type/world-skill",
  slug: "reverse-decay-fifteen-minutes",
  title: "Reverse Decay: Fifteen Minutes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
