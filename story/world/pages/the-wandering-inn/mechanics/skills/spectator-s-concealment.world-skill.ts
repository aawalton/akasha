import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spectatorSConcealment = {
  id: "01a0657d-02ed-707e-a589-09643de21fd2",
  type: "page-type/world-skill",
  slug: "spectator-s-concealment",
  title: "Spectator’s Concealment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
