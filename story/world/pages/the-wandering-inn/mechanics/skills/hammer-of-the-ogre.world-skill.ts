import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammerOfTheOgre = {
  id: "01a06575-9818-7b0d-a126-4d23a8e9df07",
  type: "page-type/world-skill",
  slug: "hammer-of-the-ogre",
  title: "Hammer of the Ogre",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
