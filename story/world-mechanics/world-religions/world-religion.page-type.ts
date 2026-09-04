import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldReligion = WorldMechanic

export const worldReligion = {
  id: "01a06558-a991-75ad-97e7-2a55723fe665",
  pageTypeSlug: "page-type",
  slug: "world-religion",
  definition: "a shared worship a character belongs to",
  pluralSlug: "world-religions",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
