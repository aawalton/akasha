import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldLegacy = WorldMechanic

export const worldLegacy = {
  id: "01a06558-a991-7854-b460-869fb15a06b9",
  pageTypeSlug: "page-type",
  slug: "world-legacy",
  definition: "an ability a character inherits from whoever held it before",
  pluralSlug: "world-legacies",
  extendsSlug: "page-type/world-mechanic",
  runsTabooCheck: false,
} as const satisfies PageType
