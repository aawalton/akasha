import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveCookOfTheMoment = {
  id: "01a0e9f1-d241-7b13-8f35-d91f53e13816",
  type: "page-type/world-skill",
  slug: "super-supportive-cook-of-the-moment",
  title: "Cook of the Moment",
  world: "world/super-supportive",
  description:
    "An S-rank Rabbit skill for cooking food that tastes like remembered comfort and smells like happiness.",
} as const satisfies WorldSkill
