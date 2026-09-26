import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerOfNimuePwr = {
  id: "01a0dee9-5493-7fe9-837f-73e87809665f",
  type: "page-type/page-type",
  slug: "tower-of-nimue-pwr",
  definition: "how much force a climber in the Tower of Nimue strikes with",
  extends: ["page-type/tower-of-nimue-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
