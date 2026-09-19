import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expandedCargoHold = {
  id: "01a06575-980a-7041-9dbc-4c4e64156c41",
  type: "page-type/world-skill",
  slug: "expanded-cargo-hold",
  title: "Expanded Cargo Hold",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
