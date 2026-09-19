import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const explosiveFlesh = {
  id: "01a06575-980a-748d-be64-86f80f4e138a",
  type: "page-type/world-skill",
  slug: "explosive-flesh",
  title: "Explosive Flesh",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
