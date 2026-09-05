import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldCondition = WorldMechanic

export const worldCondition = {
  id: "01a06558-a991-796b-9181-ee89d4d8c544",
  pageTypeSlug: "page-type",
  slug: "world-condition",
  definition: "a change the world makes to a character, that stays with them",
  pluralSlug: "world-conditions",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
