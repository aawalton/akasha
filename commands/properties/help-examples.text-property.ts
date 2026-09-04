import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpExamples = string

export const helpExamples = {
  id: "01a06958-32b2-7a85-8f69-f4300e902aaf",
  pageTypeSlug: "text-property",
  slug: "help-examples",
  propertySlug: "examples",
  definition: "one worked invocation printed under a command's help",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
