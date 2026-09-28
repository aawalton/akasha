import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSkillFacets = {
  id: "01a0e9f1-065f-7ae4-a337-700ff1876bf8",
  type: "page-type/world-mechanic",
  slug: "super-supportive-skill-facets",
  title: "Facets",
  world: "world/super-supportive",
  aliases: ["facet"],
  description:
    "Add-ons that give an open-ended skill new functions without changing what it fundamentally is.",
} as const satisfies WorldMechanic
