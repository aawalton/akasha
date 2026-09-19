import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const orderlyConduct = {
  id: "01a0657d-027c-70f0-8546-4868875c598b",
  type: "page-type/world-skill",
  slug: "orderly-conduct",
  title: "Orderly Conduct",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
