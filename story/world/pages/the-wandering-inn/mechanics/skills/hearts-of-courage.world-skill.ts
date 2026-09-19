import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heartsOfCourage = {
  id: "01a06575-9819-726b-8247-19fb1fc35f32",
  type: "page-type/world-skill",
  slug: "hearts-of-courage",
  title: "Hearts of Courage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
