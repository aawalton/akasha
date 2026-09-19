import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const keenBlades = {
  id: "01a06575-9821-7fad-a617-46eae33fabca",
  type: "page-type/world-skill",
  slug: "keen-blades",
  title: "Keen Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
