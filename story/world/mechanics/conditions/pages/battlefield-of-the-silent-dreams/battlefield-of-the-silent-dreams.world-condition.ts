import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const battlefieldOfTheSilentDreams = {
  id: "01a0655a-7b79-7342-b212-af247578d425",
  type: "page-type/world-condition",
  slug: "battlefield-of-the-silent-dreams",
  title: "Battlefield of the Silent (Dreams)",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
