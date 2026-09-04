import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../mechanics/world-mechanic.page-type.ts"

export type WorldAspect = WorldMechanic

export const worldAspect = {
  id: "01a06558-a991-7cc1-8110-7cd6d92ebb03",
  pageTypeSlug: "page-type",
  slug: "world-aspect",
  definition: "a change the world makes to what a character is made of",
  pluralSlug: "world-aspects",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
