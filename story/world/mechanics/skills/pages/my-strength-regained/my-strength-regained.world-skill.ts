import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myStrengthRegained = {
  id: "01a0657d-0270-7909-8787-3f27c5010278",
  type: "page-type/world-skill",
  slug: "my-strength-regained",
  title: "My Strength, Regained",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
