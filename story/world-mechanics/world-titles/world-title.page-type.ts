import type { PageType } from "@akasha/pages/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.types.ts"

export type WorldTitle = WorldMechanic

export const worldTitle = {
  id: "01a06558-a991-7a45-b681-fed7723c95e3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-title",
  definition: "a name the world gives a character for something they did",
  pluralSlug: "world-titles",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
