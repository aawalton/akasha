import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const earthshakerSBlow = {
  id: "01a06575-9806-7b5e-9018-fee6b93cd9da",
  type: "page-type/world-skill",
  slug: "earthshaker-s-blow",
  title: "Earthshaker’s Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
