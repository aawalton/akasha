import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const blessingOfRains = {
  id: "01a06575-97f6-7d68-aadc-34938421e12c",
  type: "page-type/world-skill",
  slug: "blessing-of-rains",
  title: "Blessing of Rains",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
