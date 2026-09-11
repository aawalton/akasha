import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const armoredBlow = {
  id: "01a06575-97ec-74c6-aa25-ea0a928588fe",
  type: "world-skill",
  slug: "armored-blow",
  title: "Armored Blow",
  world: "the-wandering-inn",
  evolvesToSlugs: ["full-armor-onslaught"],
} as const satisfies WorldSkill
