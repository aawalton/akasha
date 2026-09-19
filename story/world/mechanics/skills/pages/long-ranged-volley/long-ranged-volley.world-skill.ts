import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longRangedVolley = {
  id: "01a0657d-0240-70b0-bafb-1957afc2092d",
  type: "page-type/world-skill",
  slug: "long-ranged-volley",
  title: "Long-Ranged Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
