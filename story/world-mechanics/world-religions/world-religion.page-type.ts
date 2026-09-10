import type { PageType } from "@akasha/pages/page-type"

export const worldReligion = {
  id: "01a06558-a991-75ad-97e7-2a55723fe665",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-religion",
  definition: "a shared worship a character belongs to",
  pluralSlug: "world-religions",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
