import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myStrengthRegainedTenMinutes = {
  id: "01a0657d-0270-70dd-af4e-9cd0eed2ade7",
  type: "page-type/world-skill",
  slug: "my-strength-regained-ten-minutes",
  title: "My Strength, Regained (Ten Minutes)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
