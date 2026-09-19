import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fieldsPermafrostResistance = {
  id: "01a06575-980c-7bdb-83d4-39f3a682ba71",
  type: "page-type/world-skill",
  slug: "fields-permafrost-resistance",
  title: "Fields: Permafrost Resistance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
