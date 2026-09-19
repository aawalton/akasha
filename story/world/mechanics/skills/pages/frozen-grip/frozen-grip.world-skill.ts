import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const frozenGrip = {
  id: "01a06575-9811-7ec7-ad5e-dd8ae31d1164",
  type: "page-type/world-skill",
  slug: "frozen-grip",
  title: "Frozen Grip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
