import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const predeterminedDestination = {
  id: "01a0657d-0296-75bb-b20c-2bfd39398731",
  type: "world-skill",
  slug: "predetermined-destination",
  title: "Predetermined Destination",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
