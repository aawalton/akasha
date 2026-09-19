import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const redirectMomentum = {
  id: "01a0657d-02a6-77f8-bc23-bd812a291984",
  type: "page-type/world-skill",
  slug: "redirect-momentum",
  title: "Redirect Momentum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
