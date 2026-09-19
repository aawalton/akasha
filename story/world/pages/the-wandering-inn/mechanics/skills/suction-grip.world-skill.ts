import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const suctionGrip = {
  id: "01a0657d-02fe-785c-b8be-8de579414c3f",
  type: "page-type/world-skill",
  slug: "suction-grip",
  title: "Suction Grip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
