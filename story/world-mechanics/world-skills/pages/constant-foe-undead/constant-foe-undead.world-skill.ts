import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const constantFoeUndead = {
  id: "01a06575-97fd-75f6-9783-287a7cff1597",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "constant-foe-undead",
  title: "Constant Foe (Undead)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
