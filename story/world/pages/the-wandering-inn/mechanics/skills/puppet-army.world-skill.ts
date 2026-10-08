import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const puppetArmy = {
  id: "01a0657d-029a-7026-89ee-fc09e0d691a2",
  type: "page-type/world-skill",
  slug: "puppet-army",
  title: "Puppet Army",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.618Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
