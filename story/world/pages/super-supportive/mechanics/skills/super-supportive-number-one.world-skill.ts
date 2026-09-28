import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveNumberOne = {
  id: "01a0e9f6-d517-737a-bb9f-d65f69f85a02",
  type: "page-type/world-skill",
  slug: "super-supportive-number-one",
  title: "Number One",
  world: "world/super-supportive",
  description:
    "An S-rank Chainer skill that speeds a wordchain up so it hits harder and lasts shorter.",
} as const satisfies WorldSkill
