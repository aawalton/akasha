import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stealthRoll = {
  id: "01a0657d-02f9-7fe9-83ae-d56dbca5a813",
  type: "page-type/world-skill",
  slug: "stealth-roll",
  title: "Stealth Roll",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.713Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
