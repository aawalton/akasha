import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfTheThrone = {
  id: "01a06575-97f7-7493-8ab7-e33f3a2b055d",
  type: "page-type/world-skill",
  slug: "boon-of-the-throne",
  title: "Boon of the Throne",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
