import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldLegacy = {
  id: "01a06558-a991-7854-b460-869fb15a06b9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-legacy",
  definition: "an ability a character inherits from whoever had it before",
  pluralSlug: "world-legacies",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
