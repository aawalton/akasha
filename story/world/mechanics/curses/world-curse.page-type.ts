import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCurse = {
  id: "01a06558-a991-70f3-9df8-3f1468231807",
  type: "page-type/page-type",
  slug: "world-curse",
  definition: "a lasting harm somebody lays on a character",
  pluralSlug: "curses",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-19T11:25:39.000Z",
} as const satisfies PageType
