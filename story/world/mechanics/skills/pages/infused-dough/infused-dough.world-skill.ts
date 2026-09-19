import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const infusedDough = {
  id: "01a06575-981e-70cb-927e-ba89e604973e",
  type: "page-type/world-skill",
  slug: "infused-dough",
  title: "Infused Dough",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
