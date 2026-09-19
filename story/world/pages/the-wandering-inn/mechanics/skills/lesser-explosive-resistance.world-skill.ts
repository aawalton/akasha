import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserExplosiveResistance = {
  id: "01a06575-9822-7a2b-98b6-1061029d0867",
  type: "page-type/world-skill",
  slug: "lesser-explosive-resistance",
  title: "Lesser Explosive Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
