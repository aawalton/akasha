import type { Cover } from "./properties/cover.text-property.ts"
import type { Description } from "./properties/description.text-property.ts"
import type { Id } from "./properties/id.text-property.ts"
import type { PageTypeSlug } from "./properties/page-type-slug.relation-property.ts"
import type { Slug } from "./properties/slug.text-property.ts"
import type { Title } from "./properties/title.text-property.ts"
import type { PageType } from "./types/page-type.page-type.ts"

export type Page = {
  id: Id
  pageTypeSlug: PageTypeSlug
  slug: Slug
  title?: Title
  description?: Description
  cover?: Cover
}

export const page = {
  id: "01a049b9-856c-7090-bd14-5a916f574259",
  pageTypeSlug: "page-type",
  slug: "page",
  definition: "all that is kept about one thing",
  pluralSlug: "pages",
  extendsSlug: [],
  properties: [
    { pagePropertySlug: "id", required: true, many: false },
    { pagePropertySlug: "page-type-slug", required: true, many: false },
    { pagePropertySlug: "slug", required: true, many: false },
    { pagePropertySlug: "title", required: false, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "cover", required: false, many: false },
  ],
  partSlugs: [
    "relation-property/page-type-slug",
    "text-property/cover",
    "text-property/description",
    "text-property/id",
    "text-property/slug",
    "text-property/title",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is one TypeScript file.",
    },
    {
      invariantKind: "departure",
      statement: "A page is one exported object named for the page's slug.",
    },
    {
      invariantKind: "absence",
      statement: "A page has no body.",
    },
    {
      invariantKind: "absence",
      statement: "Every section is a property.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its path changes.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its slug changes.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity is unchanged when its title changes.",
    },
    {
      invariantKind: "departure",
      statement:
        "An identity replaced for being no uuid version 7 keeps the old identity's last eight hex.",
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
    {
      invariantKind: "stopgap",
      statement: "Loading a page's file declares that page's value and runs no code.",
    },
    {
      invariantKind: "gap",
      statement: "A page file that runs code beyond the value declaration does not land.",
    },
  ],
} as const satisfies PageType
