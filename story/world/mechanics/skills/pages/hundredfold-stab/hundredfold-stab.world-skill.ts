import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hundredfoldStab = {
  id: "01a06575-981b-76a2-9116-52cf30d15d8d",
  type: "page-type/world-skill",
  slug: "hundredfold-stab",
  title: "Hundredfold Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
