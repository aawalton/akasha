import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldBoon = WorldMechanic

export const worldBoon = {
  id: "01a06558-a991-7d9a-a1d3-501e6bcb1529",
  pageTypeSlug: "page-type",
  slug: "world-boon",
  definition: "a gift a people or a power grants a character",
  pluralSlug: "world-boons",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
