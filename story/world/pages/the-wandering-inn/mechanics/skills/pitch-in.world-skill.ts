import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pitchIn = {
  id: "01a0657d-0295-709f-b1b3-e8993f980dce",
  type: "page-type/world-skill",
  slug: "pitch-in",
  title: "Pitch In",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
