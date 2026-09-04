import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type Release = CollectionExternal & {
  title: Title
}

export const release = {
  id: "01a06769-ed1a-7000-825b-b75cf6badf16",
  pageTypeSlug: "page-type",
  slug: "release",
  definition: "an album Alan keeps",
  pluralSlug: "releases",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A release holds the songs put out together under one title.",
    },
    {
      invariantKind: "departure",
      statement: "A release names the artist the release is part of.",
    },
  ],
} as const satisfies PageType
