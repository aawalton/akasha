import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fourfoldVolley = {
  id: "01a06575-9810-7c01-ad2e-fea89791553b",
  type: "page-type/world-skill",
  slug: "fourfold-volley",
  title: "Fourfold Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
