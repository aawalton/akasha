import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const pitOfManyDeaths = {
  id: "01a0657d-0295-791a-abd7-2719fcf632f3",
  type: "world-skill",
  slug: "pit-of-many-deaths",
  title: "Pit of Many Deaths",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["pitfall-trap"],
  references: "jsonl",
} as const satisfies WorldSkill
