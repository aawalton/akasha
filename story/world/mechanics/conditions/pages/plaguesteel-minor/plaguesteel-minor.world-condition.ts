import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const plaguesteelMinor = {
  id: "01a0655a-7b7b-7230-b8df-99be589c45ad",
  type: "page-type/world-condition",
  slug: "plaguesteel-minor",
  title: "Plaguesteel (Minor)",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
