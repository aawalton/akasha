import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const classLockFemaleTorenRequired = {
  id: "01a0655a-7b7a-7916-b634-dcf6b57687ca",
  type: "page-type/world-condition",
  slug: "class-lock-female-toren-required",
  title: "Class Lock: Female Toren required.",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
