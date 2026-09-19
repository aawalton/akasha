import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skyHook = {
  id: "01a0657d-02c6-7a06-aa11-c3d03ef47c7e",
  type: "page-type/world-skill",
  slug: "sky-hook",
  title: "Sky Hook",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
