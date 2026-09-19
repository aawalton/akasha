import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const partialRestoration = {
  id: "01a0657d-0287-7824-9875-eefc97999bca",
  type: "page-type/world-skill",
  slug: "partial-restoration",
  title: "Partial Restoration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
