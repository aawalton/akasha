import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catchYourself = {
  id: "01a06575-97fa-71a9-92ae-c64382bb1f99",
  type: "page-type/world-skill",
  slug: "catch-yourself",
  title: "Catch Yourself",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
