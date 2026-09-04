import type { PageType } from "./page-types/page-type.page-type.ts"
import type { Cover } from "./properties/cover.text-property.ts"
import type { Id } from "./properties/id.text-property.ts"
import type { PageTypeSlug } from "./properties/page-type-slug.relation-property.ts"
import type { Slug } from "./properties/slug.text-property.ts"
import type { Title } from "./properties/title.text-property.ts"

export type Page = {
  id: Id
  pageTypeSlug: PageTypeSlug
  slug: Slug
  title?: Title
  cover?: Cover
}

export const page = {
  id: "01a049b9-856c-7090-bd14-5a916f574259",
  pageTypeSlug: "page-type",
  slug: "page",
  definition: "all that is kept about one thing",
  pluralSlug: "pages",
  extendsSlug: null,
  properties: [
    { pagePropertySlug: "id", required: true, many: false },
    { pagePropertySlug: "page-type-slug", required: true, many: false },
    { pagePropertySlug: "slug", required: true, many: false },
    { pagePropertySlug: "title", required: false, many: false },
    { pagePropertySlug: "cover", required: false, many: false },
  ],
  partSlugs: [
    "module/entry-ceiling",
    "module/markdown-document",
    "module/markdown-page-at",
    "module/markdown-page-name",
    "module/markdown-page-type",
    "module/page-address",
    "module/page-beside",
    "module/page-body",
    "module/page-entries",
    "module/page-entry-landing",
    "module/page-entry-queue",
    "module/page-entry-writing",
    "module/page-export-name",
    "module/page-file-name",
    "module/page-file-parts",
    "module/page-secret",
    "module/page-uncommitted",
    "module/page-value",
    "relation-property/page-type-slug",
    "text-property/cover",
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
        "An identity replaced for being no uuid version 7 keeps the last eight hex of the old one.",
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
      statement: "Loading a page's file declares its value and does nothing else.",
    },
    {
      invariantKind: "gap",
      statement: "A page file that does more than declare its value does not land.",
    },
  ],
} as const satisfies PageType
