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
  design: [
    "A page's identity is a uuid version 7, unchanged when its path, slug or title changes.",
    "A page is deleted once its purpose is done.",
  ],
} as const satisfies PageType
