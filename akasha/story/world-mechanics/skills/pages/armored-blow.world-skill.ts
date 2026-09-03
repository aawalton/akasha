import type { WorldSkill } from "../world-skill.page-type.ts"

export const armoredBlow = {
  id: "01a06575-97ec-74c6-aa25-ea0a928588fe",
  pageTypeSlug: "world-skill",
  slug: "armored-blow",
  title: "Armored Blow",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["full-armor-onslaught"],
} as const satisfies WorldSkill
