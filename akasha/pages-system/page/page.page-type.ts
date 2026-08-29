import type { PageType } from "../page-type/page-type.page-type.ts"
import type { Id } from "./properties/id.page-property-type.ts"
import type { PageTypeSlug } from "./properties/page-type-slug.page-property-type.ts"
import type { Slug } from "./properties/slug.page-property-type.ts"

export type Page = {
  id: Id
  pageTypeSlug: PageTypeSlug
  slug: Slug
}

export const page = {
  id: "01a049b9-856c-7090-bd14-5a916f574259",
  pageTypeSlug: "page-type",
  slug: "page",
  definition: "all that is kept about one thing",
  extendsSlug: null,
  partSlugs: ["domain/page-edge"],
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "A page is one TypeScript file.",
    },
    {
      invariantKind: "departure",
      statement: "A page is one exported object, named for the page's slug.",
    },
    {
      invariantKind: "absence",
      statement: "A page has no body; every section is a property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's identity is a uuid version 7, unchanged when its path, slug or title changes.",
    },
    {
      invariantKind: "departure",
      statement: "Some page properties have their own files.",
    },
    {
      invariantKind: "departure",
      statement: "Some page property files are not TypeScript files.",
    },
    {
      invariantKind: "departure",
      statement: "A page is deleted once its purpose is done.",
    },
  ],
  condition: [
    {
      invariantKind: "departure",
      statement: "Loading a page's file declares its value and does nothing else.",
    },
  ],
} as const satisfies PageType
