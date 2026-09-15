import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const smoothReload = {
  id: "01a0657d-02c7-7d95-aaf9-f33307d9bac5",
  type: "world-skill",
  slug: "smooth-reload",
  title: "Smooth Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
