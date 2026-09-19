import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldLegacy = {
  id: "01a06558-a991-7854-b460-869fb15a06b9",
  type: "page-type/page-type",
  slug: "world-legacy",
  definition: "an ability a character inherits from whoever had it before",
  pluralSlug: "legacies",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
