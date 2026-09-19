import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stolenSecondsOfTheft = {
  id: "01a0657d-02fa-786d-98bd-04855b776bd1",
  type: "page-type/world-skill",
  slug: "stolen-seconds-of-theft",
  title: "Stolen Seconds of Theft",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
