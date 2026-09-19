import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eagleEyes = {
  id: "01a06575-9806-7219-85db-4ab03c9614c4",
  type: "page-type/world-skill",
  slug: "eagle-eyes",
  title: "Eagle Eyes",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["keen-eyes"],
  references: "jsonl",
} as const satisfies WorldSkill
