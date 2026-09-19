import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spotDeception = {
  id: "01a0657d-02ee-7446-9b45-92b1efbbd4b7",
  type: "page-type/world-skill",
  slug: "spot-deception",
  title: "Spot Deception",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
