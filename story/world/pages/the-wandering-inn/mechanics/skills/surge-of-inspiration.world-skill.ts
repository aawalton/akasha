import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const surgeOfInspiration = {
  id: "01a0657d-0303-7b3f-a252-b87034fe2ae7",
  type: "page-type/world-skill",
  slug: "surge-of-inspiration",
  title: "Surge of Inspiration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
