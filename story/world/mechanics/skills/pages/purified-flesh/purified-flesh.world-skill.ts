import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const purifiedFlesh = {
  id: "01a0657d-029a-7d0f-b266-1dd0c45cf7f7",
  type: "page-type/world-skill",
  slug: "purified-flesh",
  title: "Purified Flesh",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
