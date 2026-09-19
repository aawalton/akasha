import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tractionPull = {
  id: "01a0657d-0316-7bde-87aa-3e38d2fde6d2",
  type: "page-type/world-skill",
  slug: "traction-pull",
  title: "Traction Pull",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
