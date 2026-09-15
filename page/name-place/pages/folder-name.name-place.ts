import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const folderName = {
  id: "01a04fd0-c6ea-77f5-8c92-d3fab1cd61b5",
  type: "page-type/name-place",
  slug: "folder-name",
  definition: "the name a folder carries",
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with one page is named for that page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with the property pages of a page is named `properties`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with many pages of one type is named `pages`.",
    },
  ],
} as const satisfies NamePlace
