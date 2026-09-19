import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quicksilverPaws = {
  id: "01a0657d-029b-72d5-972d-323316150c2c",
  type: "page-type/world-skill",
  slug: "quicksilver-paws",
  title: "Quicksilver Paws",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
