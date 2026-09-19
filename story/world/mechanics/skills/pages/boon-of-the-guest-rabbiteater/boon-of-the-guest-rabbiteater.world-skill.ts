import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheGuestRabbiteater = {
  id: "01a06575-97f7-76d7-bcf8-ca85e3115e41",
  type: "page-type/world-skill",
  slug: "boon-of-the-guest-rabbiteater",
  title: "Boon of the Guest: Rabbiteater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
