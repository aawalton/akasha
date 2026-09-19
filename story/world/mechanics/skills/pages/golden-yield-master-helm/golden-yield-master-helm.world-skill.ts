import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const goldenYieldMasterHelm = {
  id: "01a06575-9815-7b53-b0a9-e5c3623a331c",
  type: "page-type/world-skill",
  slug: "golden-yield-master-helm",
  title: "Golden Yield: Master Helm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
