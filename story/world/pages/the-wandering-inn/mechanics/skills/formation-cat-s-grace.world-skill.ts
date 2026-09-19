import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const formationCatSGrace = {
  id: "01a06575-9810-7c6f-be17-ca693d330393",
  type: "page-type/world-skill",
  slug: "formation-cat-s-grace",
  title: "Formation: Cat’s Grace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
