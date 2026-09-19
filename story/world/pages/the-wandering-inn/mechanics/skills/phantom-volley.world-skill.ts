import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomVolley = {
  id: "01a0657d-0290-7284-a63a-27ece095003a",
  type: "page-type/world-skill",
  slug: "phantom-volley",
  title: "Phantom Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
