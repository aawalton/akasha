import type { PageType } from "../page-types/page-type.page-type.ts"
import type { SelectProperty } from "../select-properties/select-property.page-type.ts"

export type Rung =
  | "F"
  | "D-"
  | "D"
  | "D+"
  | "C-"
  | "C"
  | "C+"
  | "B-"
  | "B"
  | "B+"
  | "A-"
  | "A"
  | "A+"
  | "S-"
  | "S"
  | "S+"

export type RankProperty = SelectProperty & {
  values: readonly Rung[]
}

export const rankProperty = {
  id: "01a063de-2c60-7004-81e6-21e2564b7832",
  pageTypeSlug: "page-type",
  slug: "rank-property",
  definition: "a page property holding a rung on a ladder of grades",
  pluralSlug: "rank-properties",
  extendsSlug: ["page-type/select-property"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ladder runs from `F` up to `S+`.",
    },
    {
      invariantKind: "departure",
      statement: "A rung above another rung is a better grade.",
    },
    {
      invariantKind: "departure",
      statement: "A rank property states the whole ladder as its values.",
    },
  ],
} as const satisfies PageType
