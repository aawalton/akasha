import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalAllyGoblins = {
  id: "01a0657d-0271-735e-a4a6-2e0d2675c22b",
  type: "page-type/world-skill",
  slug: "natural-ally-goblins",
  title: "Natural Ally: Goblins",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
