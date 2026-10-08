import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaWell = {
  id: "01a0657d-0242-70c7-85d0-e60bc8660929",
  type: "page-type/world-skill",
  slug: "mana-well",
  title: "Mana Well",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.530Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
