import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const glaciersheetIce = {
  id: "01a06575-9815-7789-a46d-bbe038632625",
  type: "page-type/world-skill",
  slug: "glaciersheet-ice",
  title: "Glaciersheet Ice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
