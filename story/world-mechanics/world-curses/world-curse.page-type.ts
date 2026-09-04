import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldCurse = WorldMechanic

export const worldCurse = {
  id: "01a06558-a991-70f3-9df8-3f1468231807",
  pageTypeSlug: "page-type",
  slug: "world-curse",
  definition: "a lasting harm somebody lays on a character",
  pluralSlug: "world-curses",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
