import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const balladOfTheHornsOfHammerad = {
  id: "01a06575-97f2-7189-94de-7afdad7d3ef3",
  type: "page-type/world-skill",
  slug: "ballad-of-the-horns-of-hammerad",
  title: "Ballad of the Horns of Hammerad",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
