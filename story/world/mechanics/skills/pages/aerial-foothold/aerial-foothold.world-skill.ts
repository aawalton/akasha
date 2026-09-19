import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aerialFoothold = {
  id: "01a06575-97ea-7c7f-9e9e-9275a3bfd4f6",
  type: "page-type/world-skill",
  slug: "aerial-foothold",
  title: "Aerial Foothold",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
