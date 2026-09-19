import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const secondThoughts = {
  id: "01a0657d-02b8-7218-b4fc-13ad92fc5124",
  type: "page-type/world-skill",
  slug: "second-thoughts",
  title: "Second Thoughts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
