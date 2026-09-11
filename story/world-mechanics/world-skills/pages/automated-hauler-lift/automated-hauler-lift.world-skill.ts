import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const automatedHaulerLift = {
  id: "01a06575-97f0-737f-8dd2-dcb5a6628e55",
  type: "world-skill",
  slug: "automated-hauler-lift",
  title: "Automated Hauler Lift",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
