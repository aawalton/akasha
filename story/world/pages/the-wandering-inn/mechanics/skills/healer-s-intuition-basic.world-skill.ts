import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const healerSIntuitionBasic = {
  id: "01a06575-9819-74e7-bca3-495faf272e2e",
  type: "page-type/world-skill",
  slug: "healer-s-intuition-basic",
  title: "Healer’s Intuition (Basic)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
