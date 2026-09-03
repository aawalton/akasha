import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldSpell = WorldMechanic

export const worldSpell = {
  id: "01a06558-a991-7470-be3c-3b147e9922f7",
  pageTypeSlug: "page-type",
  slug: "world-spell",
  definition: "an ability a character works from the magic around them",
  pluralSlug: "world-spells",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
