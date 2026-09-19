import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aLittleBitOfCourage = {
  id: "01a06575-97e7-70d5-8120-cc26529916f1",
  type: "page-type/world-skill",
  slug: "a-little-bit-of-courage",
  title: "A Little Bit of Courage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
