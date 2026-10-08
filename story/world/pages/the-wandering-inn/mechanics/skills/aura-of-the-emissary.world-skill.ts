import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheEmissary = {
  id: "01a06575-97f0-7a06-9c16-cb290364a63e",
  type: "page-type/world-skill",
  slug: "aura-of-the-emissary",
  title: "Aura of the Emissary",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  evolvesFromSlugs: ["world-skill/aura-of-command"],
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.560Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSkill
