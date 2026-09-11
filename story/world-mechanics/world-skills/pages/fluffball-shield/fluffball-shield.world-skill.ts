import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fluffballShield = {
  id: "01a06575-980f-7492-a5bc-65958dc85128",
  type: "world-skill",
  slug: "fluffball-shield",
  title: "Fluffball Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
