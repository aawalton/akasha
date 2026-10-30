import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessVariant = {
  id: "01a06582-bd62-7e3d-b7b8-4f186da6875b",
  type: "page-type/select-property",
  slug: "chess-variant",
  propertySlug: "variant",
  definition: "the kind of chess a game uses",
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
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T14:54:31.148Z",
} as const satisfies SelectProperty
