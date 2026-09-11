import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const condemnedByHellfire = {
  id: "01a06575-97fc-754d-a081-b338dfc34c19",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "condemned-by-hellfire",
  title: "Condemned by Hellfire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
