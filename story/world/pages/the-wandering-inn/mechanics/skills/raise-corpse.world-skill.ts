import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const raiseCorpse = {
  id: "01a0657d-029c-79fe-9734-4eb03819df86",
  type: "page-type/world-skill",
  slug: "raise-corpse",
  title: "Raise Corpse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
