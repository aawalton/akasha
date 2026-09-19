import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const balladOfBravery = {
  id: "01a06575-97f2-76df-80c8-739b16897ea4",
  type: "page-type/world-skill",
  slug: "ballad-of-bravery",
  title: "Ballad of Bravery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
