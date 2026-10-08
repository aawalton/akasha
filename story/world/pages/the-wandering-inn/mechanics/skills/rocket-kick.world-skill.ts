import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rocketKick = {
  id: "01a0657d-02b6-7765-9d1f-18b506eb0b34",
  type: "page-type/world-skill",
  slug: "rocket-kick",
  title: "Rocket Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.646Z",
  updatedAt: "2026-09-22T13:33:09.000Z",
} as const satisfies WorldSkill
