import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldCarriedMemory = WorldMechanic

export const worldCarriedMemory = {
  id: "01a06558-a991-78c7-9a6d-2ab331b3a6c0",
  pageTypeSlug: "page-type",
  slug: "world-carried-memory",
  definition: "someone else's remembered life, carried by a character",
  pluralSlug: "world-carried-memories",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
