import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateInformation = {
  id: "01a0657d-0240-726e-8343-39a143c7dfc4",
  type: "page-type/world-skill",
  slug: "locate-information",
  title: "Locate Information",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
