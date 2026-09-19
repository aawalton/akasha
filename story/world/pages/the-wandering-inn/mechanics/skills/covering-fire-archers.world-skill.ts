import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const coveringFireArchers = {
  id: "01a06575-97fe-7ee1-9dc6-574d11daf96d",
  type: "page-type/world-skill",
  slug: "covering-fire-archers",
  title: "Covering Fire: Archers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
