import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const thickboneBody = {
  id: "01a0655a-7b7b-7964-b265-399593dfbe7d",
  type: "page-type/world-condition",
  slug: "thickbone-body",
  title: "Thickbone Body",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
