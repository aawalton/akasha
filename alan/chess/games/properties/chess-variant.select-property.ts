import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const chessVariant = {
  id: "01a06582-bd62-7e3d-b7b8-4f186da6875b",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "chess-variant",
  propertySlug: "variant",
  definition: "which chess a game was played as",
  values: [
    "standard",
    "chess960",
    "crazyhouse",
    "antichess",
    "atomic",
    "horde",
    "king-of-the-hill",
    "racing-kings",
    "three-check",
    "from-position",
  ],
  types: "ts",
} as const satisfies SelectProperty
