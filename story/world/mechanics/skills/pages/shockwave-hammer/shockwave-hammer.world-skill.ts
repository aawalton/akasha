import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shockwaveHammer = {
  id: "01a0657d-02c1-7300-87b4-196a3c642287",
  type: "page-type/world-skill",
  slug: "shockwave-hammer",
  title: "Shockwave Hammer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
