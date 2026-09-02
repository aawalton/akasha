import type { TextProperty } from "@akasha/pages-system/text-property"

export type CrateIconPath = string

export const crateIconPath = {
  id: "01a0602d-6ad1-726a-9b60-fca5fd8cda01",
  pageTypeSlug: "text-property",
  slug: "crate-icon-path",
  propertySlug: "icon-path",
  definition: "where a crate's icon picture lives in the repository",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is read against the repository root.",
    },
    {
      invariantKind: "constraint",
      statement: "A crate's icon is a picture rather than text.",
    },
    {
      invariantKind: "constraint",
      statement: "A crate's icon lives outside akasha.",
    },
  ],
} as const satisfies TextProperty
