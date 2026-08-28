import type { PageType } from "./page-type.page-type.ts"

export type PagePropertyType = {
  id: string
  slug: string
  title: string
  pageTypeSlug: string
  domainParentSlug: string
  definition: string
  nameFormatSlug: string | null
  max: number | null
}

export const pagePropertyType = {
  id: "01a049ae-fe2c-7255-b9eb-cc89c834fc2a",
  slug: "page-property-type",
  pluralSlug: "page-property-types",
  title: "Page property type",
  pageTypeSlug: "page-type",
  extendsSlug: "domain",
  domainParentSlug: "akasha-page",
  files: ["akasha/**/*.page-property-type.ts"],
  definition: "the shape of one value a page carries",
  propertyTypeSlugs: [],
} as const satisfies PageType
