import type { PageType } from "@akasha/pages/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldMiracle = WorldMechanic

export const worldMiracle = {
  id: "01a06558-a991-7a2a-abd8-460809b4f867",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-miracle",
  definition: "an ability a character works from faith rather than magic",
  pluralSlug: "world-miracles",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
