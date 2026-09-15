import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const lucidDreaming = {
  id: "01a0657d-0241-7b50-841a-aa99e85a3408",
  type: "world-skill",
  slug: "lucid-dreaming",
  title: "Lucid Dreaming",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
