import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fasterToUntamedLands = {
  id: "01a06575-980c-7bbd-9bb1-d0dcb4504c98",
  type: "page-type/world-skill",
  slug: "faster-to-untamed-lands",
  title: "Faster to Untamed Lands",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
