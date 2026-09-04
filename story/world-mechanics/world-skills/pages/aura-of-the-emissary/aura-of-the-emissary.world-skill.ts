import type { WorldSkill } from "../../world-skill.page-type.ts"

export const auraOfTheEmissary = {
  id: "01a06575-97f0-7a06-9c16-cb290364a63e",
  pageTypeSlug: "world-skill",
  slug: "aura-of-the-emissary",
  title: "Aura of the Emissary",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["aura-of-command"],
  references: "jsonl",
} as const satisfies WorldSkill
