import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserBondFrostwing = {
  id: "01a06575-9822-7d35-ac1f-0fc3701d19c3",
  type: "page-type/world-skill",
  slug: "lesser-bond-frostwing",
  title: "Lesser Bond: Frostwing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
