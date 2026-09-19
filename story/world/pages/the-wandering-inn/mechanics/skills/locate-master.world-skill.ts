import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateMaster = {
  id: "01a0657d-0240-7f87-901d-c1a2e5a562d4",
  type: "page-type/world-skill",
  slug: "locate-master",
  title: "Locate Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
