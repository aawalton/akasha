import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sliplessWheels = {
  id: "01a0657d-02c6-7e2e-addb-ddf7e8fadf6c",
  type: "page-type/world-skill",
  slug: "slipless-wheels",
  title: "Slipless Wheels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
