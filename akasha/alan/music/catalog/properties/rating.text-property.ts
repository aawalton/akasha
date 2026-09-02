import type { TextProperty } from "@akasha/pages-system/text-property"

export type Rating =
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

export const rating = {
  id: "01a06243-144b-7004-8d79-0c039c429e23",
  pageTypeSlug: "text-property",
  slug: "rating",
  propertySlug: "rating",
  definition: "Alan's grade for what a page is about",
  max: 2,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A grade is a rung on the ladder from `F` up to `S+`.",
    },
  ],
} as const satisfies TextProperty
