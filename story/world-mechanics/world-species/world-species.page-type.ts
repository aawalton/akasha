import type { PageType } from "@akasha/pages/page-type"

export const worldSpecies = {
  id: "01a06558-a991-724e-8d8a-217efd5250c6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-species",
  definition: "the kind of creature a character is",
  pluralSlug: "world-species",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
} as const satisfies PageType
