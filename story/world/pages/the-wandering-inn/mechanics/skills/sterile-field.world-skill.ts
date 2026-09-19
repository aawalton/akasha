import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sterileField = {
  id: "01a0657d-02fa-760a-a332-9178dfcc5fdc",
  type: "page-type/world-skill",
  slug: "sterile-field",
  title: "Sterile Field",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
