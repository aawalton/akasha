import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const efficaciousMedicine = {
  id: "01a06575-9806-7c70-a06f-12c535433758",
  type: "page-type/world-skill",
  slug: "efficacious-medicine",
  title: "Efficacious Medicine",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
