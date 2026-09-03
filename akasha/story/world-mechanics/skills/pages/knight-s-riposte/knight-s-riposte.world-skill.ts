import type { WorldSkill } from "../../world-skill.page-type.ts"

export const knightSRiposte = {
  id: "01a06575-9821-735b-92da-fb9891bf2cfc",
  pageTypeSlug: "world-skill",
  slug: "knight-s-riposte",
  title: "Knight’s Riposte",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["brute-s-swing"],
  references: "jsonl",
} as const satisfies WorldSkill
