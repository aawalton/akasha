import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyesInTheBack = {
  id: "01a06575-980b-789e-bdc9-73d7f71bd921",
  type: "page-type/world-skill",
  slug: "eyes-in-the-back",
  title: "Eyes In The Back",
  world: "world/the-wandering-inn",
  aliases: ["Eyes in the Back"],
  references: "jsonl",
} as const satisfies WorldSkill
