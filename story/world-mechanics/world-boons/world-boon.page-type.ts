import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldBoon = {
  id: "01a06558-a991-7d9a-a1d3-501e6bcb1529",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-boon",
  definition: "a gift a people or a power grants a character",
  pluralSlug: "world-boons",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
