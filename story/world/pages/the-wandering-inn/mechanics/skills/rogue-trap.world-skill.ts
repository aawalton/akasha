import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rogueTrap = {
  id: "01a0657d-02b6-725d-90da-01b9a4a7478c",
  type: "page-type/world-skill",
  slug: "rogue-trap",
  title: "Rogue Trap",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.646Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
