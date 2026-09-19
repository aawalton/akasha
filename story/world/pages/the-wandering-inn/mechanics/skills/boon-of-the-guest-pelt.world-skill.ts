import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheGuestPelt = {
  id: "01a06575-97f7-7003-a8f9-f3e55239a2f9",
  type: "page-type/world-skill",
  slug: "boon-of-the-guest-pelt",
  title: "Boon of the Guest: Pelt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
