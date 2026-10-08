import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antimagicBolt = {
  id: "01a06575-97eb-7aa5-b0ac-5e47610a645e",
  type: "page-type/world-skill",
  slug: "antimagic-bolt",
  title: "Antimagic Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.555Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
