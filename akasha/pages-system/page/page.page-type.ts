import type { Id } from "./properties/id.page-property-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { Slug } from "./properties/slug.page-property-type.ts"

export type Page = {
  id: Id
  slug: Slug
}

export const page = {
  id: "01a049b9-856c-7090-bd14-5a916f574259",
  slug: "page",
  definition: "what is recorded about one thing of a specific type",
  extendsSlug: null,
  partSlugs: [
    "akasha-page-edge",
  ],
  requiredReadingSlugs: [
    "akasha-page-edge",
  ],
  design: [
    "A page is one TypeScript file.",
    "A page is one exported object, named for the page's slug.",
    "A page has no body; every section is a property.",
    "A page's identity is a uuid version 7, unchanged when its path, slug or title changes.",
    "Some page properties have their own files.",
    "Some page property files are not TypeScript files.",
    "A page is deleted once its purpose is done.",
  ],
} as const satisfies PageType
