import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const berserk = {
  id: "01a06575-97f5-7edc-95b7-9dc738799e00",
  type: "page-type/world-skill",
  slug: "berserk",
  title: "Berserk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
