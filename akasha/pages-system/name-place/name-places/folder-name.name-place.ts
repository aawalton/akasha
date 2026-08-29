import type { NamePlace } from "../name-place.page-type.ts"

export const folderName = {
  id: "01a04fd0-c6ea-77f5-8c92-d3fab1cd61b5",
  pageTypeSlug: "name-place",
  slug: "folder-name",
  definition: "the name a folder carries",
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder holding one page is named for that page's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding the property pages of a page is named `properties`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding many pages of one type is named the plural of that type.",
    },
  ],
} as const satisfies NamePlace
