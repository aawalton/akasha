import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deflectArrows = {
  id: "01a06575-9802-7888-8d3f-0488cfeb551d",
  type: "page-type/world-skill",
  slug: "deflect-arrows",
  title: "Deflect Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
