import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicFootwork = {
  id: "01a06575-97f3-739d-ab05-fe6ed2aea0a4",
  type: "world-skill",
  slug: "basic-footwork",
  title: "Basic Footwork",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
