import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pursueTheQuarry = {
  id: "01a0657d-029a-7239-9f66-486d941034c6",
  type: "page-type/world-skill",
  slug: "pursue-the-quarry",
  title: "Pursue the Quarry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
