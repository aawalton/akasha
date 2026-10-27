import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCondition = {
  id: "01a06558-a991-796b-9181-ee89d4d8c544",
  type: "page-type/page-type",
  slug: "world-condition",
  definition: "a change the world makes to a character, that stays with them",
  pluralSlug: "conditions",
  extends: ["page-type/world-mechanic"],
  parts: [],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-27T19:42:51.926Z",
} as const satisfies PageType
