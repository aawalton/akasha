import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const knowThyAudience = {
  id: "01a06575-9821-789b-9b9e-0df842716546",
  type: "page-type/world-skill",
  slug: "know-thy-audience",
  title: "Know Thy Audience",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
