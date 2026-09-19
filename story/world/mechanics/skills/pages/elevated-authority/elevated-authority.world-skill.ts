import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elevatedAuthority = {
  id: "01a06575-9807-77ba-a9a6-6ea9ca7b2b5f",
  type: "page-type/world-skill",
  slug: "elevated-authority",
  title: "Elevated Authority",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
