import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldLegacy = {
  id: "01a06558-a991-7854-b460-869fb15a06b9",
  type: "page-type/page-type",
  slug: "world-legacy",
  definition: "an ability a character inherits from whoever had it before",
  pluralSlug: "legacies",
  extends: ["page-type/world-mechanic"],
  parts: [],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-27T19:46:50.059Z",
} as const satisfies PageType
