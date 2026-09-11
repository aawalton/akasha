import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const auraOfTheEmissary = {
  id: "01a06575-97f0-7a06-9c16-cb290364a63e",
  type: "world-skill",
  slug: "aura-of-the-emissary",
  title: "Aura of the Emissary",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["aura-of-command"],
  references: "jsonl",
} as const satisfies WorldSkill
