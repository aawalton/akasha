import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ejectPatron = {
  id: "01a06575-9807-7fdf-b7ba-d59662e6d3ab",
  type: "page-type/world-skill",
  slug: "eject-patron",
  title: "Eject Patron",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
