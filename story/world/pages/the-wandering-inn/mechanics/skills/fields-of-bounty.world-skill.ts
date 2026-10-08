import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fieldsOfBounty = {
  id: "01a06575-980c-71dc-b750-96007ce1d81b",
  type: "page-type/world-skill",
  slug: "fields-of-bounty",
  title: "Fields of Bounty",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
