import type { PageType } from "@akasha/pages/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldItem = WorldMechanic

export const worldItem = {
  id: "01a06558-a991-78cc-a7cf-5b7b4ad460d7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-item",
  definition: "a thing a character has, that does something on its own",
  pluralSlug: "world-items",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
