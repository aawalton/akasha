import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const obeyMeForwardMarch = {
  id: "01a0657d-027b-79e7-bda9-4d55ea5b7b1c",
  type: "page-type/world-skill",
  slug: "obey-me-forward-march",
  title: "Obey Me: Forward March",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
