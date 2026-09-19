import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bleedCuts = {
  id: "01a06575-97f6-74e1-8602-f366db93f2c8",
  type: "page-type/world-skill",
  slug: "bleed-cuts",
  title: "Bleed Cuts",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
