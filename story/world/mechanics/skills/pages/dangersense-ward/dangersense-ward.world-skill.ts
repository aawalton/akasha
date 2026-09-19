import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangersenseWard = {
  id: "01a06575-9800-7aa2-9869-5a8c01489ac0",
  type: "page-type/world-skill",
  slug: "dangersense-ward",
  title: "Dangersense (Ward)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
