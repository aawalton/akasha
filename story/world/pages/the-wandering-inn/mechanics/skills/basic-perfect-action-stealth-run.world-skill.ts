import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicPerfectActionStealthRun = {
  id: "01a06575-97f4-789f-8d0d-98d900163046",
  type: "page-type/world-skill",
  slug: "basic-perfect-action-stealth-run",
  title: "Basic Perfect Action: Stealth Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
