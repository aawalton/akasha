import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const launchKick = {
  id: "01a06575-9822-7dd5-a1c2-191ed18900f5",
  type: "page-type/world-skill",
  slug: "launch-kick",
  title: "Launch Kick",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.610Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
