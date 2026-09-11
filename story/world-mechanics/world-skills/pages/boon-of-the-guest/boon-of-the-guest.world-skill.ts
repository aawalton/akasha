import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boonOfTheGuest = {
  id: "01a06575-97f7-7805-852d-44282b398cd0",
  type: "world-skill",
  slug: "boon-of-the-guest",
  title: "Boon of the Guest",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
