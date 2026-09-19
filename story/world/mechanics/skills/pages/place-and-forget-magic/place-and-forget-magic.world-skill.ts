import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const placeAndForgetMagic = {
  id: "01a0657d-0295-7452-8dda-a46b20da07f2",
  type: "page-type/world-skill",
  slug: "place-and-forget-magic",
  title: "Place And Forget Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
