import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bankedFury = {
  id: "01a06575-97f2-7ea7-a98f-fae329a01284",
  type: "page-type/world-skill",
  slug: "banked-fury",
  title: "Banked Fury",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
