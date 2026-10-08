import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const offenseMode = {
  id: "01a0657d-027b-7f0b-8e79-325bd3e282db",
  type: "page-type/world-skill",
  slug: "offense-mode",
  title: "Offense Mode",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.587Z",
  updatedAt: "2026-09-22T13:32:52.000Z",
} as const satisfies WorldSkill
