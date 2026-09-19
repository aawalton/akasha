import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const axeOfTheGigant = {
  id: "01a06575-97f2-7df5-beda-2e01552b1c28",
  type: "page-type/world-skill",
  slug: "axe-of-the-gigant",
  title: "Axe of the Gigant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
