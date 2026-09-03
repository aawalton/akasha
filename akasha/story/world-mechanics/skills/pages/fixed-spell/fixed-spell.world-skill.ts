import type { WorldSkill } from "../../world-skill.page-type.ts"

export const fixedSpell = {
  id: "01a06575-980d-7d12-9a4b-72ca7e3053a0",
  pageTypeSlug: "world-skill",
  slug: "fixed-spell",
  title: "Fixed Spell",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
