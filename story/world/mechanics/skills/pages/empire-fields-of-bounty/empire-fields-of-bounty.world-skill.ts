import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empireFieldsOfBounty = {
  id: "01a06575-9807-7b92-a143-2be69dd5457a",
  type: "page-type/world-skill",
  slug: "empire-fields-of-bounty",
  title: "Empire: Fields of Bounty",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
