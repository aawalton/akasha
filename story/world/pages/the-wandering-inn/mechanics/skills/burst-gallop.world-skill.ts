import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const burstGallop = {
  id: "01a06575-97f9-7995-9476-bb0fdbeb2f95",
  type: "page-type/world-skill",
  slug: "burst-gallop",
  title: "Burst Gallop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
