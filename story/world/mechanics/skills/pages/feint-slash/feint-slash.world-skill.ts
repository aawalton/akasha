import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const feintSlash = {
  id: "01a06575-980c-7517-bd93-ac0f4082504a",
  type: "page-type/world-skill",
  slug: "feint-slash",
  title: "Feint Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
