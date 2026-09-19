import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldOfRadiance = {
  id: "01a0657d-02c0-7841-bce5-72db411bfb28",
  type: "page-type/world-skill",
  slug: "shield-of-radiance",
  title: "Shield of Radiance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
