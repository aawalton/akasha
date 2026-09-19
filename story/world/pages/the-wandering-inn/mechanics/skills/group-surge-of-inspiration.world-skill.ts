import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groupSurgeOfInspiration = {
  id: "01a06575-9817-7ea7-b28c-eab28f06d1a5",
  type: "page-type/world-skill",
  slug: "group-surge-of-inspiration",
  title: "Group: Surge of Inspiration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
