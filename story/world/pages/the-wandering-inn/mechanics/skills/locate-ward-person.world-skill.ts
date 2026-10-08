import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateWardPerson = {
  id: "01a0657d-0240-71fa-9a20-20bb88c86732",
  type: "page-type/world-skill",
  slug: "locate-ward-person",
  title: "Locate Ward (Person)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.528Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
