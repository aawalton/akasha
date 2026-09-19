import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tenFootReach = {
  id: "01a0657d-0311-741d-8a27-736ebe72994b",
  type: "page-type/world-skill",
  slug: "ten-foot-reach",
  title: "Ten-foot Reach",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
