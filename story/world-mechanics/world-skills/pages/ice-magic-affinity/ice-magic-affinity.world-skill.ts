import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const iceMagicAffinity = {
  id: "01a06575-981c-74e0-9dad-ab088aa1e698",
  type: "world-skill",
  slug: "ice-magic-affinity",
  title: "Ice Magic Affinity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
