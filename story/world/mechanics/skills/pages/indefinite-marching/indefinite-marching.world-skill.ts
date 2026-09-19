import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indefiniteMarching = {
  id: "01a06575-981e-7a66-a8be-07684ce2b0e4",
  type: "page-type/world-skill",
  slug: "indefinite-marching",
  title: "Indefinite Marching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
