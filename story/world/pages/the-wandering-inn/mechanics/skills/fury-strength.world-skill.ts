import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const furyStrength = {
  id: "01a06575-9811-76b7-b662-a30c6d496420",
  type: "page-type/world-skill",
  slug: "fury-strength",
  title: "Fury Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
