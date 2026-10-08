import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectFameMagic = {
  id: "01a06575-9803-7e10-bd69-9426e209fec6",
  type: "page-type/world-skill",
  slug: "detect-fame-magic",
  title: "Detect Fame: Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
