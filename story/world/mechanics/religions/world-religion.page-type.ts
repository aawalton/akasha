import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldReligion = {
  id: "01a06558-a991-75ad-97e7-2a55723fe665",
  type: "page-type/page-type",
  slug: "world-religion",
  definition: "a shared worship a character belongs to",
  pluralSlug: "religions",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-19T11:25:39.000Z",
} as const satisfies PageType
