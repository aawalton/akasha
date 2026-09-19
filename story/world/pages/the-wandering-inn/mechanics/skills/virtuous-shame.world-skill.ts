import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const virtuousShame = {
  id: "01a0657d-0320-78ca-9818-6925f1837e89",
  type: "page-type/world-skill",
  slug: "virtuous-shame",
  title: "Virtuous Shame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
