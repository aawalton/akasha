import type { PageType } from "@akasha/pages/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.types.ts"

export type WorldLegacy = WorldMechanic

export const worldLegacy = {
  id: "01a06558-a991-7854-b460-869fb15a06b9",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-legacy",
  definition: "an ability a character inherits from whoever had it before",
  pluralSlug: "world-legacies",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
