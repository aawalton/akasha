import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myDreamNeverRanOutOfFuel = {
  id: "01a0657d-0270-7016-a96d-07cac274e87c",
  type: "page-type/world-skill",
  slug: "my-dream-never-ran-out-of-fuel",
  title: "My Dream Never Ran Out of Fuel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
