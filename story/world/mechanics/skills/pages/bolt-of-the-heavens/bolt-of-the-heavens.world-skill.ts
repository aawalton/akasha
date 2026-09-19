import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boltOfTheHeavens = {
  id: "01a06575-97f7-7175-a636-eeb6d7c9034f",
  type: "page-type/world-skill",
  slug: "bolt-of-the-heavens",
  title: "Bolt of the Heavens",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
