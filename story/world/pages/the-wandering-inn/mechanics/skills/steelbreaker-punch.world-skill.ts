import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelbreakerPunch = {
  id: "01a0657d-02fa-7fed-a446-de474ae0c63a",
  type: "page-type/world-skill",
  slug: "steelbreaker-punch",
  title: "Steelbreaker Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
