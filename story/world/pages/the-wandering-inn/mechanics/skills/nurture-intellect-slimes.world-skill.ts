import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nurtureIntellectSlimes = {
  id: "01a0657d-027b-7424-b7e9-5fa5222d71e1",
  type: "page-type/world-skill",
  slug: "nurture-intellect-slimes",
  title: "Nurture Intellect: Slimes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
