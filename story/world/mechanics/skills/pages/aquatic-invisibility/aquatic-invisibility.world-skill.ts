import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aquaticInvisibility = {
  id: "01a06575-97ec-7b52-b54a-cf4b33dfe9aa",
  type: "page-type/world-skill",
  slug: "aquatic-invisibility",
  title: "Aquatic Invisibility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
