import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const malleableMetal = {
  id: "01a0657d-0242-7b90-85b0-f940b25084bb",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "malleable-metal",
  title: "Malleable Metal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
