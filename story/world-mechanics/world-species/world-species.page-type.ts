import type { PageType } from "@akasha/pages-system/page-type"
import type { WorldMechanic } from "../world-mechanic.page-type.ts"

export type WorldSpecies = WorldMechanic

export const worldSpecies = {
  id: "01a06558-a991-724e-8d8a-217efd5250c6",
  pageTypeSlug: "page-type",
  slug: "world-species",
  definition: "the kind of creature a character is",
  pluralSlug: "world-species",
  extendsSlug: ["page-type/world-mechanic"],
  runsTabooCheck: false,
} as const satisfies PageType
