import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserImmunityFate = {
  id: "01a06575-9822-798e-b270-6454888cc3e2",
  type: "page-type/world-skill",
  slug: "lesser-immunity-fate",
  title: "Lesser Immunity: Fate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
