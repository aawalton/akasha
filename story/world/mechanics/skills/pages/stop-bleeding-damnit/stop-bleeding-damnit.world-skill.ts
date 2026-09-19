import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stopBleedingDamnit = {
  id: "01a0657d-02fa-770a-8195-eddb8f46aabf",
  type: "page-type/world-skill",
  slug: "stop-bleeding-damnit",
  title: "Stop Bleeding, Damnit",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
