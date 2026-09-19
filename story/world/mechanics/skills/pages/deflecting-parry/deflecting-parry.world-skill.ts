import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deflectingParry = {
  id: "01a06575-9802-7c7d-b250-ba7394b58bd0",
  type: "page-type/world-skill",
  slug: "deflecting-parry",
  title: "Deflecting Parry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
