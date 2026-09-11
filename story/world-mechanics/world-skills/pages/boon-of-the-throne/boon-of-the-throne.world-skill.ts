import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boonOfTheThrone = {
  id: "01a06575-97f7-7493-8ab7-e33f3a2b055d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boon-of-the-throne",
  title: "Boon of the Throne",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
