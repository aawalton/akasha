import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recklessAdvance = {
  id: "01a0657d-02a6-7e84-8cfd-a214a2ad6031",
  type: "page-type/world-skill",
  slug: "reckless-advance",
  title: "Reckless Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
