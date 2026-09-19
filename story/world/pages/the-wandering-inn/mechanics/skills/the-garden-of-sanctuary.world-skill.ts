import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theGardenOfSanctuary = {
  id: "01a0657d-0312-7a10-aabb-f318e6d2b406",
  type: "page-type/world-skill",
  slug: "the-garden-of-sanctuary",
  title: "The Garden of Sanctuary",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
