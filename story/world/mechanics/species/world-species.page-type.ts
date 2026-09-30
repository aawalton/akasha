import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldSpecies = {
  id: "01a06558-a991-724e-8d8a-217efd5250c6",
  type: "page-type/page-type",
  slug: "world-species",
  definition: "the kind of creature a character is",
  pluralSlug: "species",
  extends: ["page-type/world-mechanic"],
  parts: ["page-type/overwhere-i-species", "page-type/overwhere-iii-species-held"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
