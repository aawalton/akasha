import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammerOfTheHeavens = {
  id: "01a06575-9818-70bc-9833-0a7ee57bb7ba",
  type: "page-type/world-skill",
  slug: "hammer-of-the-heavens",
  title: "Hammer of the Heavens",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
