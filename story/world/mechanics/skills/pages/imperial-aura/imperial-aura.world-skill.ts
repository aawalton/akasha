import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const imperialAura = {
  id: "01a06575-981d-79b0-aabc-db25bca1ed35",
  type: "page-type/world-skill",
  slug: "imperial-aura",
  title: "Imperial Aura",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
