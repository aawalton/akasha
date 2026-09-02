import type { TextProperty } from "@akasha/pages-system/text-property"

export type IconPath = string

export const iconPath = {
  id: "01a059b8-3353-7bd6-99dd-565f57f5aa50",
  pageTypeSlug: "text-property",
  slug: "icon-path",
  propertySlug: "icon-path",
  definition: "where an app's icon picture stands in the repository",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is read against the repository root.",
    },
    {
      invariantKind: "constraint",
      statement: "An app's icon stands outside akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The seam is handed the path rather than naming the same file a second time.",
    },
  ],
} as const satisfies TextProperty
