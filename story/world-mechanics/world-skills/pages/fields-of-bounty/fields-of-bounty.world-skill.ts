import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fieldsOfBounty = {
  id: "01a06575-980c-71dc-b750-96007ce1d81b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fields-of-bounty",
  title: "Fields of Bounty",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
