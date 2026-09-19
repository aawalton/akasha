import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scarstrike = {
  id: "01a0657d-02b8-71fd-9bf4-21f4ff3e460c",
  type: "page-type/world-skill",
  slug: "scarstrike",
  title: "Scarstrike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
