import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adeptBoneshaping = {
  id: "01a06575-97e9-75f5-b716-31686219ec82",
  type: "page-type/world-skill",
  slug: "adept-boneshaping",
  title: "Adept Boneshaping",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
