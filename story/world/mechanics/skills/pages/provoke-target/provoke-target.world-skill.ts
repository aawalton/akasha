import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const provokeTarget = {
  id: "01a0657d-0297-7128-9935-c29b4de1a77a",
  type: "page-type/world-skill",
  slug: "provoke-target",
  title: "Provoke Target",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
