import type { PagePropertyType } from "./page-property-type.page-type.ts"

export type PageType = {
  id: string
  slug: string
  pluralSlug: string
  title: string
  pageTypeSlug: string
  extendsSlug: string
  domainParentSlug: string
  files: readonly string[]
  definition: string
  propertyTypeSlugs: readonly PagePropertyType["slug"][]
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  slug: "page-type",
  pluralSlug: "page-types",
  title: "Page type",
  pageTypeSlug: "page-type",
  extendsSlug: "domain",
  domainParentSlug: "akasha-page",
  files: ["akasha/**/*.page-type.ts"],
  definition: "the specification for a kind of page",
  propertyTypeSlugs: [],
} as const satisfies PageType
