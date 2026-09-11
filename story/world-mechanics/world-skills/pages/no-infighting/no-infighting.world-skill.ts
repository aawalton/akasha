import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const noInfighting = {
  id: "01a0657d-027b-7a1b-9388-e80b6f1ce192",
  type: "world-skill",
  slug: "no-infighting",
  title: "No Infighting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
