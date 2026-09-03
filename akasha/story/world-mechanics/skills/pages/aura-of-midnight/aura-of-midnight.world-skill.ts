import type { WorldSkill } from "../../world-skill.page-type.ts"

export const auraOfMidnight = {
  id: "01a06575-97ef-7008-b98e-d88f6507e4a2",
  pageTypeSlug: "world-skill",
  slug: "aura-of-midnight",
  title: "Aura of Midnight",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["dark-aura"],
  references: "jsonl",
} as const satisfies WorldSkill
