import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const infuseColors = {
  id: "01a06575-981e-729f-bbec-9ce1703b9d39",
  type: "page-type/world-skill",
  slug: "infuse-colors",
  title: "Infuse Colors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
