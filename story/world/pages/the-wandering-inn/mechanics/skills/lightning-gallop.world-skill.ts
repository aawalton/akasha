import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningGallop = {
  id: "01a0657d-023f-7848-b1bf-2595fc91728d",
  type: "page-type/world-skill",
  slug: "lightning-gallop",
  title: "Lightning Gallop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
