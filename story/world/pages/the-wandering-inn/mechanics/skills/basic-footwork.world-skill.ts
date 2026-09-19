import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicFootwork = {
  id: "01a06575-97f3-739d-ab05-fe6ed2aea0a4",
  type: "page-type/world-skill",
  slug: "basic-footwork",
  title: "Basic Footwork",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
