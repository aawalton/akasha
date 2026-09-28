import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveThetetFever = {
  id: "01a0e9f3-f5f6-7f28-9688-50ececbe3859",
  type: "page-type/world-condition",
  slug: "super-supportive-thetet-fever",
  title: "Thetet Fever",
  world: "world/super-supportive",
  description: "A disease on Artona III.",
} as const satisfies WorldCondition
