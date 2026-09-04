import type { TextProperty } from "@akasha/pages-system/text-property"

export type InstallPath = string

export const installPath = {
  id: "01a06861-49aa-732d-b17a-0d0fb92dccad",
  pageTypeSlug: "text-property",
  slug: "install-path",
  propertySlug: "install-path",
  definition: "where outside akasha the body is put so the thing reading it finds it",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
