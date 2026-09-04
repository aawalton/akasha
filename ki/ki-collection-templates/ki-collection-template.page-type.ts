import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"

export type KiCollectionTemplate = CollectionExternal & {
  title: Title
}

export const kiCollectionTemplate = {
  id: "01a06825-d0ec-7fb0-9159-d7bc2e559c43",
  pageTypeSlug: "page-type",
  slug: "ki-collection-template",
  definition: "a collection of Ki's, held apart from Alan's",
  pluralSlug: "ki-collection-templates",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type of Ki's stands under this one.",
    },
    {
      invariantKind: "departure",
      statement: "No page type holds a collection of Ki's beside a collection of Alan's.",
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
} as const satisfies PageType
