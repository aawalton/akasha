import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bridgeTheGap = {
  id: "01a06575-97f9-7e5d-8bcd-5139ff23695c",
  type: "page-type/world-skill",
  slug: "bridge-the-gap",
  title: "Bridge the Gap",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
