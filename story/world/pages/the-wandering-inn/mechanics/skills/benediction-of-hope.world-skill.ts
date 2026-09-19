import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const benedictionOfHope = {
  id: "01a06575-97f5-7ec5-9622-b46092a79bdf",
  type: "page-type/world-skill",
  slug: "benediction-of-hope",
  title: "Benediction of Hope",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
