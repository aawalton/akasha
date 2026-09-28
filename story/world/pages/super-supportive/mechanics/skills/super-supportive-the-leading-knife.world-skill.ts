import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTheLeadingKnife = {
  id: "01a0e9f6-d518-7665-a1e2-d0c004296693",
  type: "page-type/world-skill",
  slug: "super-supportive-the-leading-knife",
  title: "The Leading Knife",
  world: "world/super-supportive",
  aliases: ["Leading Knife"],
  description:
    "A knife Meister skill whose thrown lead blade drags every nearby sharp thing behind it like a flock.",
} as const satisfies WorldSkill
