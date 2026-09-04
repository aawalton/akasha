import type { WorldSkill } from "../../world-skill.page-type.ts"

export const minotaurPunch = {
  id: "01a0657d-024d-7bf0-96f1-c9ec0f602e19",
  pageTypeSlug: "world-skill",
  slug: "minotaur-punch",
  title: "Minotaur Punch",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["power-strike"],
  references: "jsonl",
} as const satisfies WorldSkill
