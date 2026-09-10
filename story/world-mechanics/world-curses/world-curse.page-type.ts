import type { PageType } from "@akasha/pages/page-type"

export const worldCurse = {
  id: "01a06558-a991-70f3-9df8-3f1468231807",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-curse",
  definition: "a lasting harm somebody lays on a character",
  pluralSlug: "world-curses",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
