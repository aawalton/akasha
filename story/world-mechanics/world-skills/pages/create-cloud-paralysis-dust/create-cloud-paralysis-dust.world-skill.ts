import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createCloudParalysisDust = {
  id: "01a06575-97fe-7b9e-8d0f-b465032bc7c7",
  type: "world-skill",
  slug: "create-cloud-paralysis-dust",
  title: "Create Cloud: Paralysis Dust",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
