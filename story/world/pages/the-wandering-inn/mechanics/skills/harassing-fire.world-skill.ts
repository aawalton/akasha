import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const harassingFire = {
  id: "01a06575-9818-7456-b0d2-457261439d8c",
  type: "page-type/world-skill",
  slug: "harassing-fire",
  title: "Harassing Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
