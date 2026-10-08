import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const featherHop = {
  id: "01a06575-980c-74aa-a7b0-32a1fde05caa",
  type: "page-type/world-skill",
  slug: "feather-hop",
  title: "Feather Hop",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
