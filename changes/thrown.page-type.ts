import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const thrown = {
  id: "01a09150-0000-7000-8000-000000000001",
  type: "page-type",
  slug: "thrown",
  definition: "a page type thrown away once the guard is proved",
  pluralSlug: "thrown",
  extends: ["page-type/page"],
} as const satisfies PageType
