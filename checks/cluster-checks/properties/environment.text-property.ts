import type { TextProperty } from "@akasha/pages-system/text-property"

export type Environment = string

export const environment = {
  id: "01a0680b-1003-7202-a332-1b60717bf2f1",
  pageTypeSlug: "text-property",
  slug: "environment",
  propertySlug: "environment",
  definition: "the variables a process is started with",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
