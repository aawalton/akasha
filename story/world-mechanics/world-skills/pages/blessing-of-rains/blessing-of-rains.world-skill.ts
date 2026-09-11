import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blessingOfRains = {
  id: "01a06575-97f6-7d68-aadc-34938421e12c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "blessing-of-rains",
  title: "Blessing of Rains",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
