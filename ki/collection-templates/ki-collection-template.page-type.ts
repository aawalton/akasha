import type { PageType } from "@akasha/pages/page-type"

export const kiCollectionTemplate = {
  id: "01a06825-d0ec-7fb0-9159-d7bc2e559c43",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-collection-template",
  definition: "a collection of Ki's, held apart from Alan's",
  pluralSlug: "ki-collection-templates",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type of Ki's is under this page type.",
    },
    {
      invariantKind: "departure",
      statement: "No page type has a collection of Ki's beside a collection of Alan's.",
    },
    {
      invariantKind: "departure",
      statement: "Ki scores a collection with a number and grades that collection with a letter.",
    },
    {
      invariantKind: "gap",
      statement: "Whatever is imported for Ki lands on a page type of Ki's own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
