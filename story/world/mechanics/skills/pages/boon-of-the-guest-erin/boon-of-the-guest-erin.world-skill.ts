import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheGuestErin = {
  id: "01a06575-97f7-7512-b85b-ee584be30240",
  type: "page-type/world-skill",
  slug: "boon-of-the-guest-erin",
  title: "Boon of the Guest: Erin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
