import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const relocateBase = {
  id: "01a0657d-02b0-7123-9044-26357e048f0c",
  type: "page-type/world-skill",
  slug: "relocate-base",
  title: "Relocate Base",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
