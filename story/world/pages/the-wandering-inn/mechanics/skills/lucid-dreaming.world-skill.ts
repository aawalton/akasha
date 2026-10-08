import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lucidDreaming = {
  id: "01a0657d-0241-7b50-841a-aa99e85a3408",
  type: "page-type/world-skill",
  slug: "lucid-dreaming",
  title: "Lucid Dreaming",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.529Z",
  updatedAt: "2026-09-22T13:32:44.000Z",
} as const satisfies WorldSkill
