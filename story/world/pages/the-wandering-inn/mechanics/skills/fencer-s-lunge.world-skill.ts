import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fencerSLunge = {
  id: "01a06575-980c-745e-9687-38104f9db873",
  type: "page-type/world-skill",
  slug: "fencer-s-lunge",
  title: "Fencer’s Lunge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
