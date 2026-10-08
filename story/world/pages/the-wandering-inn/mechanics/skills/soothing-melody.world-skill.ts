import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const soothingMelody = {
  id: "01a0657d-02c7-7281-9db8-247c20a599d2",
  type: "page-type/world-skill",
  slug: "soothing-melody",
  title: "Soothing Melody",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.663Z",
  updatedAt: "2026-09-22T13:33:26.000Z",
} as const satisfies WorldSkill
