import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterResistanceMental = {
  id: "01a06575-9817-7de1-91e2-643c70b7dc1e",
  type: "page-type/world-skill",
  slug: "greater-resistance-mental",
  title: "Greater Resistance: Mental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
